import React from "react";
import "./AddHeader.css";
import cartImg from "../cartImg.png";
import { NavLink } from "react-router-dom";

const AddHeader = ({ totalQuantity, cartItems }) => {
  const cartTotal = totalQuantity(cartItems);

  return (
    <div className="navbar">
      <NavLink to="/">
        <h2 className="logo">TeeRex Store</h2>
      </NavLink>
      <div className="menu">
        <h3 className="products">
          <NavLink to="/" className="product">
            Products
          </NavLink>
        </h3>
        <button className="cart-icon">
          <NavLink to="/cart">
            <span className="badge">{cartTotal}</span>
            <img src={cartImg} alt="" />
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default AddHeader;
