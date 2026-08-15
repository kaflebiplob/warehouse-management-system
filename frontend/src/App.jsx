import React from "react";
import "./App.css";
import HomePage from "./Pages/Homepage";
import ProductsPage from "./Pages/ProductsPage";
import ShipmentsPage from "./Pages/ShipmentsPage";
import LoginPage from "./Pages/LoginPage";
import Customers from "./Pages/Customers";
import CreateShipmentPage from "./Pages/CreateShipmentPage";
import CreateProductPage from "./Pages/CreateProductPage";
import CreateCustomerPage from "./Pages/CreateCustomerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/customers/new" element={<CreateCustomerPage />} />
        <Route path="/customers" element={<Customers />} />

        <Route path="/products/new" element={<CreateProductPage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route path="/shipments/new" element={<CreateShipmentPage />} />
        <Route path="/shipments" element={<ShipmentsPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
