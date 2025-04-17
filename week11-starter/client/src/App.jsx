import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Discovery from "./pages/Discovery";
import ItemDetails from "./pages/ItemDetails";
import SalesPage from "./pages/Sales";
import Wishlist from "./pages/Wishlist";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="app">
      <Navigation />
      <main style={{ padding: '20px 16px', minHeight: 'calc(100vh - 150px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/knits/:id" element={<ItemDetails />} /> 
          <Route path="*" element={<div><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
