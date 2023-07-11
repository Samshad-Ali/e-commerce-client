import React from "react";
import './CartItem.scss'
import {MdDelete} from 'react-icons/md'
import { addToCart, deleteFromCart, removeFromCart } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";
function CartItem({item}) {
    const dispatch=useDispatch();
    const handleDeleteBtn=()=>{
        dispatch(deleteFromCart(item))
    }
    return (
        <div className="CartItem">
            <div className="item-img">
                <img src={item.image} alt="" />
            </div>
            <div className="item-info-wrapper">
                <div className="item-info">
                    <p className="title">{item.title}</p>
                    <p className="price">₹ {item.price}</p>
                 
                    <div className="btn-content flex-center">
                <button onClick={()=>{dispatch(removeFromCart(item))}} className="btn">-</button>
                <span>{item.quantity}</span>
                <button onClick={()=>{dispatch(addToCart(item))}} className="btn">+</button>
              </div>
                    <p className="total-price">Subtotal: ₹ {item.price * item.quantity}</p>
                </div>
                <button className="item-remove" onClick={handleDeleteBtn}>
                    <MdDelete />
                </button>
            </div>
        </div>
    );
}

export default CartItem;