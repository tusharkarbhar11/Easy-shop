
// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/Product";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";

function App() {
  // Store the registered account
  const [registeredUser, setRegisteredUser] = useState(null);

  // Store the currently logged-in user
  const [user, setUser] = useState(null);

//   useEffect(() => {
//   console.log("Registered user state updated:", registeredUser);
// }, [registeredUser]);

  // console.log(user)
  // console.log(registeredUser)
  return (
    <CartProvider>
      {/* Navbar changes based on login status */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Products page */}
        <Route path="/products" element={<Product />} />

        {/* Single product details */}
        <Route
          path="/products/:id"
          element={<SingleProduct />}
        />

        {/* Register page */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Register
                registeredUser={registeredUser}
                setRegisteredUser={setRegisteredUser}
              />
            )
          }
        />

        {/* Login page */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login
                registeredUser={registeredUser}
                setUser={setUser}
              />
            )
          }
        />

        {/* Cart page: logged-in users only */}
        <Route
          path="/cart"
          element={
            user ? <Cart /> : <Navigate to="/login" replace />
          }
        />

        {/* Unknown URLs redirect to Home */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
