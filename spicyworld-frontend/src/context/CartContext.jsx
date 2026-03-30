import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (food) => {
        toast.success(`Added ${food.name} to cart`, { id: `add-${food._id}` });
        setCartItems(prev => {
            const existing = prev.find(item => item._id === food._id);
            if (existing) {
                return prev.map(item => item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...food, quantity: 1 }];
        });
    };

    const addToCartMany = (items) => {
        setCartItems(prev => {
            let newCart = [...prev];
            items.forEach(newItem => {
                const existingIndex = newCart.findIndex(item => item._id === newItem._id || item.foodId === newItem._id || item._id === newItem.foodId);
                if (existingIndex > -1) {
                    newCart[existingIndex] = { 
                        ...newCart[existingIndex], 
                        quantity: newCart[existingIndex].quantity + newItem.quantity 
                    };
                } else {
                    // Ensure we have a consistent structure (some API items might use foodId)
                    newCart.push({
                        _id: newItem.foodId || newItem._id,
                        name: newItem.name,
                        price: newItem.price,
                        image: newItem.image, // May be missing in order history items, depends on API
                        quantity: newItem.quantity
                    });
                }
            });
            return newCart;
        });
        toast.success(`${items.length} items added to cart!`);
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        const currentItem = cartItems.find(i => i._id === id);
        if (currentItem) toast.success(`Removed ${currentItem.name}`, { id: `remove-${id}` });
        
        setCartItems(prev => prev.filter(i => i._id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item._id === id) {
                const newQty = item.quantity + delta;
                if (newQty <= 0) {
                    // This is handled by removeFromCart in UI, but just in case
                    return item; 
                }
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => setCartItems([]);

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, addToCartMany, removeFromCart, updateQuantity, clearCart,
            totalPrice, cartCount, isCartOpen, setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
