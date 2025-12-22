import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../auth/authSlice';
import cartSlice from '../cart/cartSlice';
import productSlice from '../products/productSlice';
import searchSlice from '../search/searchSlice';
// import userSlice from '../users/userSlice';
import orderSlice from '../orders/orderSlice';
import paySlice from '../pay/paySlice';


const store = configureStore({
    reducer:{
        products: productSlice,
        cart: cartSlice,
        // user: userSlice,
        filter:searchSlice,
        auth:authSlice,
        orders:orderSlice,
        pay:paySlice

    }
})

export default store