import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import { useSelector } from 'react-redux'
import { axiosClient } from "../../utils/axiosClient";
const Home = () => {
  const [topProduct,setTopProduct]=useState(null);
  const categories=useSelector((state)=>state.CategoryReducer.data)
  const fetchingData=async()=>{
    try {
   
        const topProductData = await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image')
        setTopProduct(topProductData.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchingData()

  },[])
  return (
    <div className="home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="sub-heading">
            Shop from the best, our Film and TV Posters Collection.
          </p>
        </div>
        <div className="content">
         {
          categories?.map(category=><Category key={category.id} category={category} />)
         }
        </div>
      </section>
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="sub-heading">
            All new design, Same old details
          </p>
        </div>
        <div className="content">
         {topProduct?.map(product=><Product key={product.id} product={product}/>)}
        </div>
      </section>
    </div>
  );
};

export default Home;
