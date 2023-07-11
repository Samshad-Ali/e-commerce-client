import React, { useEffect, useState } from "react";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";

const Collection = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [products, SetProducts] = useState(null);
  const categories = useSelector((state) => state.CategoryReducer.data);
  const sortOptions = [
    {
      value: "Price - Low To High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];
  const [sortBy,setSortBy]=useState(sortOptions[0].sort)
 
  const handleChange = (e) => {
    navigate(`/category/${e.target.value}`);
  };

  const fetchData = async () => {
    const url= params.categoryId ? `/products?populate=image&filters[catergory][key][$eq]=${params.categoryId}&sort=${sortBy}:asc`:
    `/products?populate=image&${params.categoryId}&sort=${sortBy}:asc`
    const responseData = await axiosClient(
      url 
    );
    SetProducts(responseData.data.data);
  };
  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchData();
  }, [params,sortBy]);

  return (
    <div className="categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>
              India's largest collection of wall posters for your bedroom,
              living room, kids room, kitchen and posters & art prints at
              highest quality lowest price guaranteed.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h4 className="heading">Sort By</h4>
              <select name="sort-by" id="sort-by" onChange={(e)=>{setSortBy(e.target.value)}}>
               {
                sortOptions.map((option)=><option key={option.sort}value={option.sort} >{option.value}</option>)
               }
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              <div className="radio-box">
                {categories?.map((item) => (
                  <div className="info" key={item.attributes.key}>
                    <input
                      onChange={handleChange}
                      type="radio"
                      value={item?.attributes.key}
                      name="category"
                      id={item?.attributes.key}
                      checked={categoryId === item?.attributes.key}
                    />
                    <label htmlFor={item?.attributes.key}>
                      {item?.attributes.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="product-box">
            {products?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
