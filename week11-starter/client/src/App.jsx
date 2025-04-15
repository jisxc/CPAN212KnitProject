import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddKnit from "./pages/AddKnit";
import AllKnits from "./pages/AllKnits";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KnitDetail from "./pages/KnitDetails";
import EditKnit from "./pages/EditKnit";

const App = () => {
  return (
    <div className="app">
      <Navigation />
      <main style={{ padding: '20px 16px', minHeight: 'calc(100vh - 150px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/knits" element={<AllKnits />} />
          <Route path="/knits/add" element={<AddKnit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/knits/:id" element={<KnitDetail />} />
          <Route path="/knits/edit/:id" element={<EditKnit />} />
          <Route path="*" element={<div><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
