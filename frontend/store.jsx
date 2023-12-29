import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import notificationReducer from './slices/notificationSlice'
import orderReducer from './slices/orderSlice'
import searchReducer from './slices/searchSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        notification: notificationReducer,
        order : orderReducer,
        search : searchReducer
    }
});

export default store;
