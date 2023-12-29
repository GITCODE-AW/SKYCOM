import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { cancelOrderItemAction, fetchOrderItemAction, orderAllItemAction } from "../actions/orderActions";

const initialState = {
    loading: false,
    error: false,
    message: null,
    order_items: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        cancelOrderItem: (state, action) => {
            state.order_items = state.order_items.map(item => {
                if (item.id == action.payload) {
                    item.delivery_stat = 'cancelled'
                }
                return item
            })
        }
    },
    extraReducers: (buildercase) => {
        buildercase
            // fetch order item action 
            .addCase(fetchOrderItemAction.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchOrderItemAction.fulfilled, (state, action) => {
                state.loading = false
                state.order_items = action.payload
                state.error = false
            })
            .addCase(fetchOrderItemAction.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
            })
            // cancel order item action
            .addCase(cancelOrderItemAction.pending, (state)=>{
                state.loading = false
            })
            .addCase(cancelOrderItemAction.fulfilled, (state,action)=>{
                state.loading = false
                state.error = false
                state.message = action.payload
            }).addCase(cancelOrderItemAction.rejected, (state, action)=>{
                state.loading = false
                state.error = true
                state.message = action.payload
            })
            // order all items from cart
            .addCase(orderAllItemAction.pending, (state)=>{
                state.loading = false
            })
            .addCase(orderAllItemAction.fulfilled, (state,action)=>{
                state.loading = false
                state.error = false
                state.message = action.payload
            }).addCase(orderAllItemAction.rejected, (state, action)=>{
                state.loading = false
                state.error = true
                state.message = action.payload
            })
            
    },
});

export const useOrderState = () => {
    return useSelector((state) => state.order);
};
export const { } = orderSlice.actions;
export default orderSlice.reducer;
