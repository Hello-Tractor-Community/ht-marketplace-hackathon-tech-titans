import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import HomePage from './screens/Buyers/Home/Home';
import LoginPage from './screens/Auth/Login';
import RegistrationPage from './screens/Auth/Register';
import ProductDetailsPage from './screens/Buyers/ProductDetails';
import MessagingPage from './screens/users/Messaging';
import TractorListing from './screens/Buyers/TractorListing/TractorListing';
import SellerProductUpload from './screens/Sellers/MyProduct/Add';
import SellerProductTable from './screens/Sellers/MyProduct/list';
import Profile from './screens/users/Profile/Profile';
import OTPPage from './screens/Auth/Otp';
import ProtectedRoute from './Routes/ProtectedRoute';
import { useEffect, useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const userJson = localStorage.getItem('user_data');
      const userData = userJson ? JSON.parse(userJson) : null;
      setUser(userData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar user={user} />

      <ToastContainer />
      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* Protected Routes */}
          <Route
            path="/messages"
            element={
              <ProtectedRoute user={user}>
                <MessagingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings"
            element={<TractorListing /> }
          />
          <Route
            path="/seller/product/add"
            element={
              <ProtectedRoute user={user} allowedRoles={['seller']}>
                <SellerProductUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/products"
            element={
              <ProtectedRoute user={user} allowedRoles={['seller']}>
                <SellerProductTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/otp/verify"
            element={
                <OTPPage />
            }
          />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
