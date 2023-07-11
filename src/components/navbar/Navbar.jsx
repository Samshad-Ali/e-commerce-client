import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";
const Navbar = () => {
  const data = useSelector((state) => state.CategoryReducer.data);
  const cart = useSelector((state) => state.QuantityReducer.cart);
  let totalItems = 0;
  cart.forEach((item) => (totalItems += item.quantity));
  const [isCart, setIsCart] = useState(false);
  return (
    <>
      <nav className="nav-bar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              {data?.map((category) => (
                <li key={category?.attributes.key} className="hover-link">
                  <Link
                    className="link"
                    to={`/category/${category?.attributes.key}`}
                  >
                    {category?.attributes.title}
                  </Link>{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-center">
            <Link to={"/"}>
              <h1 className="banner">Posterz.</h1>
            </Link>
          </div>
          <div className="nav-right">
            <div
              className="nav-cart hover-link"
              onClick={() => {
                setIsCart(!isCart);
              }}
            >
              {totalItems > 0 && (
                <span className="cart-count ">{totalItems}</span>
              )}
              <BsCart className="icon " />
            </div>
          </div>
        </div>
      </nav>
      {isCart && (
        <Cart
          onClose={() => {
            setIsCart(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
