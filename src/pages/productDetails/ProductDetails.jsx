import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, removeFromCart } from "../../redux/CartSlice";
import { toast } from "react-hot-toast";
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const cart=useSelector((state)=>state.QuantityReducer.cart);
  const quantity = cart.find(item=>item.key===params.productId)?.quantity || 0;
  const handleCart=()=>{
    dispatch(addToCart(product));
    toast.success('Added to Cart')
  }
  const fetchData = async () => {
    try {
      const responseData = await axiosClient.get(
        `/products?filters[key][$eq]=${params.productId}&populate=*`
      );
      if (responseData.data.data.length > 0) {
        setProduct(responseData.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setProduct(null)
    fetchData();
  }, [params]);
  if(!product){
    return <Loading/>
  }
  return (
    <div className="product-detail flex-center">
      <div className="container flex-center">
        <div className="left-side flex-center">
          <div className="img-container">
            <img
              src={product?.attributes?.image.data.attributes.url}
              alt="product-photo"
            />
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <h2 className="heading">{product?.attributes?.title}</h2>
            <p className="price">₹ {product?.attributes?.price}</p>
            <p className="description">{product?.attributes?.desc}</p>
            <div className="btn-content flex-center">
              <button onClick={()=>{dispatch(removeFromCart(product))}} className="btn">-</button>
              <span>{quantity}</span>
              <button onClick={()=>{dispatch(addToCart(product))}} className="btn">+</button>
            </div>
            <button className="primary-btn add-btn"  onClick={handleCart}>Add to Cart
            </button>

            <ul className="list-box">
              <li className="title">
                This product is made to order and is typically printed in 3-6
                working days. Your entire order will ship out together.
              </li>
              <li className="title">
                Since this product is printed on demand especially for you, it
                is not eligible for cancellations and returns. Read our Return
                Policy.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

