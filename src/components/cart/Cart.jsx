import React from "react";
import { IoClose } from "react-icons/io5";
import {BsCartX} from 'react-icons/bs'
import CartItem from "../cartItem/CartItem";
import { useSelector } from "react-redux";
import {axiosClient} from '../../utils/axiosClient.js'
import {loadStripe} from '@stripe/stripe-js';

const Cart = ({ onClose }) => {
  const handleCheckoutBtn=async()=>{
    const response = await axiosClient.post('/orders  ',{
      product:cart
    })
    const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
    ;
    await stripe.redirectToCheckout({
      sessionId:response.data.stripeId
    })
  }
  const cart = useSelector(state=>state.QuantityReducer.cart);
  let totalAmount=0;
  cart.forEach(item=>totalAmount+=(item.price*item.quantity));
  const isCartEmpty=cart.length===0;
  return (
    <div className="cart">
      <div
        className="overlay"
        onClick={() => {
          onClose();
        }}
      ></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <span onClick={onClose}>
            <IoClose />
          </span>
        </div>
       {
        cart.map((item)=><CartItem key={item.key} item={item}/>)
       }
       {
        isCartEmpty &&
        <div className="empty-box">
        <span>

        <BsCartX/>
        </span>
        <h3>Cart is Empty</h3>
       </div>
       }
        {
          !isCartEmpty && 
          <div className="checkout-info">
          <div className="total-amount">
            <h3 className="message">Total : </h3>
            <h3 className="price">₹ {totalAmount}</h3>
          </div>
            <button className="primary-btn chkot-btn" onClick={handleCheckoutBtn}>Checkout Now</button>
        </div>
        }
      </div>
    </div>
  );
};

export default Cart;
