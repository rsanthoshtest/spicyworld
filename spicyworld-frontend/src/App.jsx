import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminFoods from './admin/pages/AdminFoods';
import AdminCategories from './admin/pages/AdminCategories';
import AdminOrders from './admin/pages/AdminOrders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';

// New Pages
import BookTable from './pages/BookTable';
import Catering from './pages/Catering';
import OurStory from './pages/OurStory';
import ContactUs from './pages/ContactUs';
import Testimonials from './pages/Testimonials';
import FAQs from './pages/FAQs';

// New Component & Toaster
import CartDrawer from './components/CartDrawer';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="text-5xl mb-4 animate-bounce">🌶</div>
                <p className="font-bold text-gray-500 animate-pulse">Checking credentials...</p>
            </div>
        </div>
    );
    return user ? children : <Navigate to="/login" />;
};

const MainLayout = ({ children }) => {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col font-outfit">
            {!isAuthPage && <Navbar />}
            <CartDrawer />
            <Toaster 
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: '#1A1A1A',
                        color: '#fff',
                        borderRadius: '100px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em'
                    }
                }}
            />
            <main className="flex-grow flex flex-col">
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
};

function App() {
  console.log("🌐 Production API Validation:", process.env.NEXT_PUBLIC_API_URL);
  return (
    <Router>
      <AdminAuthProvider>
        <Routes>
          {/* ─── Admin Routes (isolated, no Navbar/Footer) ─── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/foods" element={<AdminProtectedRoute><AdminFoods /></AdminProtectedRoute>} />
          <Route path="/admin/categories" element={<AdminProtectedRoute><AdminCategories /></AdminProtectedRoute>} />
          <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* ─── User-facing Routes ─── */}
          <Route path="/*" element={
            <AuthProvider>
              <CartProvider>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/book-table" element={<BookTable />} />
                    <Route path="/catering" element={<Catering />} />
                    <Route path="/our-story" element={<OurStory />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </MainLayout>
              </CartProvider>
            </AuthProvider>
          } />
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
