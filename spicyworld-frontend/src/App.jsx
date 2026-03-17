import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';

// New Pages
import BookTable from './pages/BookTable';
import Catering from './pages/Catering';
import OurStory from './pages/OurStory';
import ContactUs from './pages/ContactUs';
import Testimonials from './pages/Testimonials';
import FAQs from './pages/FAQs';

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

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col font-outfit">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Informational Pages */}
                <Route path="/book-table" element={<BookTable />} />
                <Route path="/catering" element={<Catering />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/faqs" element={<FAQs />} />

                {/* Protected Routes */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
