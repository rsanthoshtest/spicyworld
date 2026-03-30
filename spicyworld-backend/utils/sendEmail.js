const { Resend } = require('resend');
const dotenv = require('dotenv');
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderConfirmationEmail = async (order, customerEmail) => {
    console.log("📨 Attempting to send email to:", customerEmail);
    try {
        const { _id, items, totalPrice, paymentMethod, address, mobile, createdAt } = order;
        const orderDate = new Date(createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const itemsHtml = items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                <div style="flex: 1;">
                    <p style="margin: 0; font-weight: 700; color: #111827; font-size: 14px;">${item.name}</p>
                    <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 12px;">Qty: ${item.quantity} × ₹${item.price}</p>
                </div>
                <p style="margin: 0; font-weight: 800; color: #111827; font-size: 14px;">₹${item.price * item.quantity}</p>
            </div>
        `).join('');

        const htmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #ea580c;">Order Confirmed!</h2>
                <p>Thank you for ordering from <strong>SpicyWorld</strong>. Your order has been placed successfully.</p>
                
                <div style="background: #fff7ed; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Order ID:</strong> #${_id.toString().toUpperCase()}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Date:</strong> ${orderDate}</p>
                </div>

                <div style="margin: 20px 0;">
                    <h3 style="border-bottom: 2px solid #ea580c; padding-bottom: 5px;">Your Items</h3>
                    ${items.map(item => `
                        <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                            <span>${item.name} x ${item.quantity}</span>
                            <strong>₹${item.price * item.quantity}</strong>
                        </div>
                    `).join('')}
                </div>

                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; text-align: right;">
                    <span style="font-size: 18px; font-weight: bold; color: #ea580c;">Total Paid: ₹${totalPrice}</span>
                    <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Method: ${paymentMethod}</p>
                </div>

                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p><strong>Delivery Address:</strong><br/>${address}</p>
                    <p><strong>Contact:</strong> ${mobile}</p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.FRONTEND_URL}/orders/${_id}" style="background: #ea580c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">Track Your Order</a>
                </div>
            </div>
        `;

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: customerEmail,
            subject: `Order Confirmation #${_id.toString().slice(-6).toUpperCase()}`,
            html: htmlContent,
        });

        console.log("✅ Email sent successfully:", data);
        return { success: true, data };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, error };
    }
};

module.exports = { sendOrderConfirmationEmail };
