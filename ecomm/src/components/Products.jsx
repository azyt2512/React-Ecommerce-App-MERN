import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
// import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import  Object  from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../redux/apicall"
import {publicRequest} from "../importMethods"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => {
  // const [products, setProduct] = useState([])
  const products = useSelector(state=>state.product?.products);
  console.log(products);
  // const products = product ? product.products : [];
  // const [filteredProducts, setFilteredProducts] = useState([])
  const dispatch = useDispatch();
  // console.log(products);
  console.log({cat,filters,sort});
  
  useEffect(() => { 
    getProducts(cat,dispatch);
  }, [cat,dispatch]);
  
  // useEffect(() => {
  //   const getProduct = async () => {
  //     try{
  //      const res = await publicRequest.get("products/all");
  //     //  setProduct(res.data);
  //     }catch(err){
  //         console.log(err);
  //     }
  //   }
  //   getProduct();
  // }, [cat])
  // if (!Object.entries)
  //  Object.entries = function( obj ){
  //     var ownProps = Object.keys( obj ),
  //        i = ownProps.length,
  //        resArray = new Array(i); // preallocate the Array

  //     while (i--)
  //        resArray[i] = [ownProps[i], obj[ownProps[i]]];
  //     return resArray;
  //  };
  // function filterObject(obj){
  //   var ownProps = Object.keys( obj ),
  //        i = ownProps.length,
  //        resArray = new Array(i); // preallocate the Array

  //     while (i--)
  //        resArray[i] = [ownProps[i], obj[ownProps[i]]];
  //     return resArray;
  // }

  // useEffect(() => {
  //   cat && setFilteredProducts(
  //     products.filter((item)=>
  //      Object.entries(filters).every( ([key,value])=>
  //       item[key].includes(value) 
  //      )
  //     )
  //   );  
  // }, [products,cat,filters])
  // useEffect(() => {
  //   if(sort==="newest"){
  //     setFilteredProducts((prev)=>
  //      [...prev].sort((a,b)=> a.createdAt - b.createdAt)     
  //    );  
  //   }
  //   else if(sort==="asc"){
  //     setFilteredProducts((prev)=>
  //      [...prev].sort((a,b)=> a.price - b.price)     
  //    );  
  //   }
  //   else{
  //     setFilteredProducts((prev)=>
  //      [...prev].sort((a,b)=> b.price - a.price)     
  //    );  
  //   }
  // }, [sort])
  
  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
