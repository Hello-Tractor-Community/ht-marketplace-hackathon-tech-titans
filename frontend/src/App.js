import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
import { useEffect, useState } from 'react';
const App = () => {
  const [user, setUser] = useState({})
  
  const getUserData = async () => {
    try {
    const userJson = localStorage.getItem('user_data')
      const userData = userJson ? JSON.parse(userJson) : null;
      setUser(userData)
    } catch (err) {
      console.error(err)
    }
    
  }

  useEffect(() => {
    getUserData()
  }, [])
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar user={user} />

          <ToastContainer />
      {/* Main Content */}
      <div className="flex-grow ">
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/listings" element={<TractorListing />} />
          <Route path="/seller/product/add" element={<SellerProductUpload />} />
          <Route path="/seller/products" element={<SellerProductTable />} />
          <Route path='/profile' element={<Profile/>}/>

        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
