import { useState } from "react";
import "./newProduct.css";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../../firebase";
import { addProduct } from "../../redux/apicall";
import { useDispatch, useSelector } from "react-redux";
import  styled  from "styled-components";


const Error = styled.span`
   padding:10px;
   color:red;
`;
const Success = styled.span`
   color:#20e220;
   padding:10px;
`;

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const sellerid = useSelector(state=>state.user.currentUser?._id)
  // const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const imageURL = "product" + Math.floor(Math.random() * 5) + ".jpg";
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const notUpdated = useSelector(state=>state.product.error);
  const [update,setUpdate] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    try{
      const product = { ...inputs, sellerId: sellerid, img: imageURL, categories: cat };
      addProduct(product, dispatch);
      setUpdate(true);
    }catch(err){

    }
    // const fileName = new Date().getTime() + file.name;
    // const storage = getStorage(app);
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
      
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...  
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            // onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
         <button  className="addProductButton" onClick={handleClick} >          {/* add this before class name onClick={handleClick} */}
          Create
        </button>
        {notUpdated ? <Error>Something went wrong!!!!</Error> 
             : update ? <Success>Created Successfully , Go to the List to view</Success> : ""}
      </form>
    </div>
  );
}
