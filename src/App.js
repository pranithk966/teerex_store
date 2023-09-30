import "./styles.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddHomepage from "./components/AddHomepage";
import AddCart from "./components/AddCart";

export const config = {
  endpoint: `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
};

export default function App() {
  const [cartItems, setCartitems] = useState([]);

  const handleAdd = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist && productExist.productinCart < product.quantity) {
      setCartitems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExist, productinCart: productExist.productinCart + 1 }
            : item
        )
      );
    } else {
      alert("Sorry, product is out of stock!");
    }
  };

  const handleDecrease = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist.productinCart === 1) {
      setCartitems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartitems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExist, productinCart: productExist.productinCart - 1 }
            : item
        )
      );
    }
  };

  const handleDelete = (product) => {
    setCartitems(cartItems.filter((item) => item.id !== product.id));
  };

  const totalQuantity = (cartItems) => {
    if (!cartItems.length) return 0;

    const totalItem = cartItems
      .map((item) => item.productinCart)
      .reduce((totalItem, n) => totalItem + n);

    return totalItem;
  };

  const handleAddtocart = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (product.quantity !== 0) {
      if (productExist) {
        alert("product you try to add, already exists!");
      } else {
        setCartitems([...cartItems, { ...product, productinCart: 1 }]);
      }
    } else {
      alert("out of stock!");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/Cart"
          element={
            <AddCart
              cartItems={cartItems}
              handleAdd={handleAdd}
              handleDecrease={handleDecrease}
              handleDelete={handleDelete}
              totalQuantity={totalQuantity}
            />
          }
        ></Route>
        <Route
          exact
          path="/"
          element={
            <AddHomepage
              cartItems={cartItems}
              handleAddtocart={handleAddtocart}
              totalQuantity={totalQuantity}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
