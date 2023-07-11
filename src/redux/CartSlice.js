import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name:'cartSlice',
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            const product=action.payload.attributes;
            const curItem = product? {
                title:product.title,
                key:product.key,
                price:product.price,
                image:product.image.data.attributes.url
            }:action.payload;
            const index = state.cart.findIndex((item)=>item.key===curItem.key);
            if(index===-1){
                // item not-present
                state.cart.push({...curItem,quantity:1})
            }else{
                // item present
                state.cart[index].quantity+=1;
            }
        },
        removeFromCart:(state,action)=>{
            const key=action.payload?.attributes?.key || action.payload?.key;
            const index = state.cart.findIndex((item)=>item.key===key);
            if(index===-1) return; 
            if(state.cart[index].quantity===1){
                state.cart = state.cart.filter((item)=>item.key!==key)
            }else{
                state.cart[index].quantity-=1;
            }
            
        },
        deleteFromCart:(state,action)=>{
            const key=action.payload?.attributes?.key || action.payload?.key;
            const index = state.cart.findIndex((item)=>item.key===key);
            if(state.cart[index]){
              state.cart=state.cart.filter((item)=>item.key!==key)
            }
        },
        resetCart:(state,action)=>{
            state.cart=[]
        }
    }
})


export default CartSlice.reducer;
export const {addToCart,removeFromCart,deleteFromCart,resetCart} = CartSlice.actions;