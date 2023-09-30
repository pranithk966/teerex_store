import React, { useEffect, useState } from "react";
import "./AddFilter.css";

function AddFilter({
  productList,
  searchFilter,
  setFilterproducts,
  filterProducts,
  isOpen,
  toggle,
  ToggleSidebar
}) {
  const colorBox = [...new Set(productList.map((product) => product.color))];
  const genderBox = [...new Set(productList.map((product) => product.gender))];
  const typeBox = [...new Set(productList.map((product) => product.type))];
  const priceBox = ["0-Rs250", "Rs251-450", "Rs451-above"];

  const filterAttributes = [
    { label: "color", value: colorBox },
    { label: "gender", value: genderBox },
    { label: "type", value: typeBox },
    { label: "price", value: priceBox }
  ];

  const [checked, setChecked] = useState([]);

  const [filterList, setFilterlist] = useState({
    color: [],
    gender: [],
    type: [],
    price: []
  });

  const handlePrice = (productPrice, price) => {
    const priceRange = price.map((item) => {
      return item
        .replace(/Rs./g, "")
        .split("-")
        .map((num) => {
          return Number(num);
        });
    });

    return priceRange.map(
      (arr) => productPrice >= arr[0] && productPrice <= arr[1]
    );
  };

  const handleFilteredproductlist = (filterList) => {
    let { color, gender, type, price } = filterList;
    let filteredProducts = [];

    if (searchFilter.length) {
      if (
        color.length === 0 &&
        gender.length === 0 &&
        type.length === 0 &&
        price.length === 0
      ) {
        filteredProducts = [...productList];
      } else {
        filteredProducts = filterProducts.filter((product) => {
          return (
            (color.length === 0 || color.includes(product.color)) &&
            (gender.length === 0 || gender.includes(product.gender)) &&
            (type.length === 0 || type.includes(product.type)) &&
            (price.length === 0 ||
              handlePrice(product.price, price).includes(true))
          );
        });
      }
      setFilterproducts(filteredProducts);
    } else {
      if (
        color.length === 0 &&
        gender.length === 0 &&
        type.length === 0 &&
        price.length === 0
      ) {
        filteredProducts = [...productList];
      } else {
        filteredProducts = productList.filter((product) => {
          return (
            (color.length === 0 || color.includes(product.color)) &&
            (gender.length === 0 || gender.includes(product.gender)) &&
            (type.length === 0 || type.includes(product.type)) &&
            (price.length === 0 ||
              handlePrice(product.price, price).includes(true))
          );
        });
      }
      setFilterproducts(filteredProducts);
    }
  };

  const handleSelectfilter = (filterValue, category) => {
    const filterExist = filterList[category].indexOf(filterValue);
    if (filterExist === -1) {
      setFilterlist((prevState) => ({
        ...prevState,
        [category]: [...prevState[category], filterValue]
      }));
    } else {
      setFilterlist((prevState) => ({
        ...prevState,
        [category]: [
          ...prevState[category].filter((item) => item !== filterValue)
        ]
      }));
    }
  };

  useEffect(() => {
    handleFilteredproductlist(filterList);
  }, [filterList]);

  const handleCheck = (filterValue, category) => {
    const currentindex = checked.indexOf(filterValue);
    const newChecked = [...checked];

    if (currentindex === -1) {
      newChecked.push(filterValue);
    } else {
      newChecked.splice(currentindex, 1);
    }
    setChecked(newChecked);

    handleSelectfilter(filterValue, category);
  };

  if (toggle) {
    return (
      <div className={`toggle ${isOpen === true ? "active" : ""}`}>
        <i
          className="fa fa-times"
          aria-hidden="true"
          style={{
            fontSize: "20px",
            color: "gray",
            display: "flex",
            flexDirection: "row-reverse"
          }}
          onClick={ToggleSidebar}
        ></i>
        {filterAttributes.map((filterItems, index) => {
          return (
            <div style={{ textAlign: "start" }} key={index}>
              <div className="titleState">
                {filterItems.label.toUpperCase()}
              </div>
              <div className="options-color">
                {filterItems.value.map((ele, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={checked.indexOf(ele) === -1 ? false : true}
                      onChange={(e) => handleCheck(ele, filterItems.label)}
                    />
                    {ele}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="AllFilters">
      {filterAttributes.map((filterItems, index) => {
        return (
          <div key={index}>
            <div className="titleState">{filterItems.label.toUpperCase()}</div>
            <div className="options-color">
              {filterItems.value.map((ele, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={checked.indexOf(ele) === -1 ? false : true}
                    onChange={(e) => handleCheck(ele, filterItems.label)}
                  />
                  {ele}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AddFilter;
