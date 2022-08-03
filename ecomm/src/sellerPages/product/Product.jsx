import { Link, useLocation,useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../importMethods";
import {updateProduct} from "../../redux/apicall";
import  styled  from "styled-components";

const Error = styled.span`
   color:red;
`;
const Success = styled.span`
   color:#20e220;
`;

export default function Product() {
  // const location = useLocation();
  // const productId = location.pathname.split("/")[2];
  const productId = useParams().id;
  console.log(productId);
  const [pStats, setPStats] = useState([]);
  

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId )
  );
  const [Uproduct,setUproduct] = useState(product);
  console.log(product);

  const notUpdated = useSelector(state=>state.product.error);
  const [update,setUpdate] = useState(false);
  const dispatch = useDispatch();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  
  const handlechange = (e) =>{
    let value = e.target.value;
    setUproduct({
      ...Uproduct,
      [e.target.name]:value,
    })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      updateProduct(productId,Uproduct,dispatch);
      setUpdate(true);
    }catch(err){

    }
  }

  return (
    <div className="product">
      {/* <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/selling/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div> */}
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} name="title" onChange={handlechange}/>
            <label>Product Description</label>
            <input type="text" placeholder={product.desc} name="desc" onChange={handlechange}/>
            <label>Price</label>
            <input type="text" placeholder={product.price} name="price" onChange={handlechange}/>
            <label>In Stock</label>
            <select name="inStock" id="idStock"  onChange={handlechange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
          <div>
             {notUpdated ? <Error>Something went wrong!!!!</Error> 
             : update ? <Success>Updated Successfully , Go to the List to view</Success> : ""}
          </div>
          </div>
        </form>
      </div>
    </div>
    
  );
}
