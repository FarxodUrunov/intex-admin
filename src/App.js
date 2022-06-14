import React from "react";

import Login from "./LoginPage/Login";
import Product from "./Admin Panel/Product/Product";
import Order from "./Admin Panel/Order/Order";
import Category from "./Admin Panel/Category/Category";
import Web from "./Admin Panel/Web/Web";

import { Routes, Route } from "react-router-dom";
import useToken from "./hooks/useToken";

// styling
import "./App.css";

const App = () => {
   const { token, setToken } = useToken();

   if (!token) {
      console.log("log", token);
      return <Login setToken={setToken} />;
   }

   return (
      <Routes>
         <Route path="/" element={<Product />} />
         <Route path="/order" element={<Order />} />
         <Route path="/category" element={<Category />} />
         <Route path="/web" element={<Web />} />
      </Routes>
   );
};

export default App;
