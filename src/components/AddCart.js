import React from "react";
import AddHeader from "./AddHeader";
import "./AddCart.css";

const AddCart = ({
  cartItems,
  handlingAdd,
  handlingDecrease,
  handlingDelete,
  totalQuantity
}) => {
  const getTotalCartValue = (cartItems = []) => {
    if (!cartItems.length) return 0;

    const total = cartItems
      .map((item) => item.price * item.productinCart)
      .reduce((total, n) => total + n);

    return total;
  };
  const totalPrice = getTotalCartValue(cartItems);
  const cartTotal = totalQuantity(cartItems);

  return (
    <>
      <AddHeader cartItems={cartItems} totalQuantity={totalQuantity} open />

      <div className="CartItem">
        <div className="heads">Shopping Cart</div>
        <div className="cart">
          {cartItems.length ? (
            <>
              <div className="outer-item-cart">
                <div className="inner-item-cart">
                  {cartItems.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="Products">
                        <div className="ImageProduct">
                          <img src={item.imageURL} alt={item.name} />
                        </div>
                        <div className="Space"></div>

                        <div className="DetailsOfProduct">
                          <div className="product-data">
                            <p style={{ fontWeight: "bold" }}>{item.name}</p>
                            <p style={{ fontSize: "13.5px" }}>
                              Rs.{item.price}
                            </p>
                          </div>
                          <div className="Space"></div>

                          <div className="DetailsOf">
                            <p>Quantity: {item.productinCart}</p>
                            <p>
                              {item.quantity === item.productinCart
                                ? `No Stock Left`
                                : `Stock: ${item.quantity}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          className="change"
                          onClick={(e) => handlingAdd(item)}
                        >
                          +
                        </button>
                        <div className="Space"></div>
                        <button
                          className="change"
                          onClick={(e) => handlingDecrease(item)}
                        >
                          -
                        </button>
                        <div className="Space"></div>
                        <button
                          className="deleteItem"
                          onClick={(e) => handlingDelete(item)}
                        >
                          Remove
                        </button>
                        <i
                          onClick={(e) => handlingDelete(item)}
                          className="fa fa-trash deleteIcon"
                          style={{ fontSize: "20px", color: "gray" }}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="section"></div>
                <div className="total DetailsOf">
                  <div className="totalqty">Total Cart Items: {cartTotal}</div>
                  <div className="totalprice">
                    Total Cart Price: Rs.{totalPrice}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="cart-empty">
              No items are added, please add some items to your cart...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCart;
