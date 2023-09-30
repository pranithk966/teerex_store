import React from "react";
import "./AddProductCard.css";

function AddProductCard({ filterProducts, handleAddtocart }) {
  return (
    <div className="products">
      <div className="row">
        {filterProducts.length ? (
          filterProducts.map((product) => (
            <div className="card" key={product.id}>
              <div className="card-header">
                <span className="card-title">{product.name}</span>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="card-body">
                <p>Rs.{product.price}</p>
                <button
                  className="btn"
                  onClick={() => handleAddtocart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4 style={{ color: "grey" }}>No Products Found</h4>
        )}
      </div>
    </div>
  );
}

export default AddProductCard;
