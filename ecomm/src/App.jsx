import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Sellerhome from "./sellerPages/home/Home";
import SellerProductList from "./sellerPages/productList/ProductList";
import SellerAddProduct from "./sellerPages/newProduct/NewProduct";
import SellerEditProduct from "./sellerPages/product/Product";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

import { BrowserRouter as  Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Success } from "./pages/Success";

const Flexcontainer = styled.div`
    display:flex;
`;

const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  const seller = user && user.isSeller ? true : false;
  return (
    <Router> 
      <Routes>
         <Route exact path="/" element={ seller 
              ?<>
              <Topbar />
              <Flexcontainer >
              <Sidebar />
              <Sellerhome /> 
              </Flexcontainer>
              </>
              : <Home />} />
         
         <Route path="/selling/products" element={seller 
              ?
              <>
              <Topbar />
              <Flexcontainer >
              <Sidebar />
              <SellerProductList /> 
              </Flexcontainer>
              </>
              : <Home />} />

         <Route path="/selling/newproduct" element={seller 
              ?
              <>
              <Topbar />
              <Flexcontainer >
              <Sidebar />
              <SellerAddProduct /> 
              </Flexcontainer>
              </>
              : <Home />} />
         <Route path="/selling/editproduct/:id" element={seller 
              ?
              <>
              <Topbar />
              <Flexcontainer >
              <Sidebar />
              <SellerEditProduct /> 
              </Flexcontainer>
              </>
              : <Home />} />

         <Route path="/products/:cat" element={<ProductList />} />
             
         <Route path="/product/:id" element={<Product />} />
           
         <Route path="/cart" element={!user? <Navigate to= "/" /> :<Cart />} />
           
         <Route path="/login" element={user? <Navigate to= "/" /> : <Login />} />
                 
         <Route path="/register" element={user? <Navigate to= "/" /> :  <Register />} /> 

         <Route path="/success" element={user? <Navigate to= "/" /> :  <Success />} />         
      </Routes>
      </Router> 
       
  );
};

export default App;