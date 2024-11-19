import { Routes, Route } from 'react-router-dom';
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
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
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

        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
