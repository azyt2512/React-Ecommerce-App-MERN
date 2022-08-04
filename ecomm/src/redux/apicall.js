import { loginStart, loginFailure, loginSuccess, logoutUser } from "./userRedux";
import { publicRequest, userRequest } from "../importMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { emptyCart, updateCart } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
}
export const logout = async (dispatch) => {
  dispatch(logoutUser());
}

//PRODUCT FUNCTIONS

export const getSellerProducts = async (id, dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("products/seller/" + id);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
export const getProducts = async (cat, dispatch) => {
  if (cat === undefined) cat = "all"
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("products/all?cat=" + cat);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete("products/seller/" + id);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`products/seller/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`products/seller`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//CART FUNCTIONS
// export const getCart = async (id, dispatch) => {

//   try {
//     const res = await userRequest.get(`carts/find/` + id);
//     let cart;
//     if (res.data) {

//       cart = {
//         product: res.data.products,
//         quantity: res.data.products.length,
//         total: res.data.total,
//       }
//     }
//     else {
//       cart = {
//         product: [],
//         quantity: 0,
//         total: 0,
//       }
//     }
//     dispatch(updateCart(cart));
//   } catch (err) {

//   }
// };

// export const daleteCart = async (id, dispatch) => {

//   try {
//     const res = await userRequest.delete(`carts/find/` + id);

//   } catch (err) {

//   }
// };
// export const createCart = async (id, cart, dispatch) => {

//   try {
//     const res = await userRequest.get(`carts/` + id);
//     if (res.data) {
//       let cartId = res.data._id;
//       try {
//         let carts;
//         const res1 = await userRequest.put(`carts/` + cartId, cart);
//         if (res1.data) {

//           carts = {
//             product: res.data.products,
//             quantity: res.data.products.length,
//             total: res.data.total,
//           }
//         }
//         else {
//           carts = {
//             product: [],
//             quantity: 0,
//             total: 0,
//           }
//         }
//         dispatch(updateCart(carts));
//         dispatch(updateCart(cart))
//       } catch (err) {

//       }
//     }
//     else {
//       try {

//         const res2 = await userRequest.post(`carts/` + cartId);
//         dispatch(updateCart(cart))
//       } catch (err) {

//       }
//     }
//   } catch (err) {

//   }
// };

