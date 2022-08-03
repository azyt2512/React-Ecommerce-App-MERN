import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        product: [],
        quantity: 0,
        total: 0,
    },
    reducers:{
        addToCart:(state,action)=>{
            state.product.push(action.payload.product);
            state.quantity+=1;
            state.total+=(action.payload.total);
        },
        emptyCart:(state)=>{
            state.product= [];
            state.quantity= 0;
            state.total= 0;
        },
        updateCart:(state,action)=>{
            state.product = action.payload.products;
            state.quantity = action.payload.products;
            state.total = action.payload.total;
        }
    },
    
});

export const { addToCart,emptyCart,updateCart } = cartSlice.actions;
export default cartSlice.reducer;