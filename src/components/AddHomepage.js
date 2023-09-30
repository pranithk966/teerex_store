import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddHomepage.css";
import { config } from "../App";
import AddHeader from "./AddHeader";
import AddFilter from "./AddFilter";
import AddProductCard from "./AddProductCard";

function AddHomepage({ cartItems, handleAddtocart, totalQuantity }) {
  const url = `${config.endpoint}`;
  const [productList, setProductlist] = useState([]);
  const [filterProducts, setFilterproducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const searchParams = ["name", "color", "gender", "type"];
  const [isOpen, setIsopen] = useState(false);

  const performAPICall = async (url) => {
    try {
      let responseAPI = await axios.get(url);
      setProductlist(responseAPI.data);
    } catch (e) {
      alert(e.message);
    }
  };

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const handleSearch = (filterProducts, searchParams, searchFilter) => {
    const search = searchFilter.toLowerCase();
    if (search.length) {
      let filteredProducts = filterProducts.filter((product) =>
        searchParams.some((category) =>
          product[category].toLowerCase().includes(search)
        )
      );
      setFilterproducts(filteredProducts);
    } else {
      setFilterproducts(productList);
    }
  };

  useEffect(() => {
    performAPICall(url);
  }, []);

  useEffect(() => {
    setFilterproducts([...productList]);
  }, [productList]);

  return (
    <div className="container">
      <AddHeader cartItems={cartItems} totalQuantity={totalQuantity} />

      <div className="barSearch">
        <input
          className="input"
          type="text"
          placeholder="Search for Items..."
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <div className="space-gap"></div>
        <button
          className="buttonForSearch"
          onClick={(e) =>
            handleSearch(filterProducts, searchParams, searchFilter)
          }
        >
          Search
          <i
            className="fa fa-search"
            style={{ fontSize: "20px", color: "white" }}
          ></i>
        </button>
        <div className="space-gap"></div>
        <div className="filterToggle">
          <button className="buttonForFilter" onClick={ToggleSidebar}>
            filter
            <i
              className="fa fa-filter"
              style={{ fontSize: "20px", color: "white", margin: "0.5rem" }}
            ></i>
          </button>
          <AddFilter
            productList={productList}
            searchFilter={searchFilter}
            setProductlist={setProductlist}
            setFilterproducts={setFilterproducts}
            filterProducts={filterProducts}
            isOpen={isOpen}
            toggle
            ToggleSidebar={ToggleSidebar}
          />
        </div>
      </div>

      <div className="dashboard">
        <AddFilter
          productList={productList}
          searchFilter={searchFilter}
          setFilterproducts={setFilterproducts}
          filterProducts={filterProducts}
        />
        <AddProductCard
          filterProducts={filterProducts}
          handleAddtocart={handleAddtocart}
        />
      </div>
    </div>
  );
}

export default AddHomepage;
