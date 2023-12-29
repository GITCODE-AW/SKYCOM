import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
    fetchCartAction,
    addCartItemAction,
    removeCartItemAction,
    updateCartItemQuantityAction,
} from "../actions/cartActions";

const initialState = {
    loading: false,
    error: null,
    message: null,
    cart_items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        removeCartItem: (state, action) => {
            state.cart_items = state.cart_items.filter((cart_item) => {
                return cart_item.id !== action.payload;
            });
        },
        updateCartItemQuantity: (state, action) => {
            state.cart_items = state.cart_items.map((cart_item) => {
                if (
                    cart_item.id == action.payload.cart_item_id &&
                    action.payload.quantity >= 1 &&
                    action.payload.quantity <= 4
                ) {
                    cart_item.quantity = action.payload.quantity;
                }
                return cart_item;
            });
        },
        emptyCartItems:(state) =>{
            state.cart_items = []
        }
    },
    extraReducers: (buildercase) => {
        buildercase
            // fetch cart items list
            .addCase(fetchCartAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cart_items = action.payload;
                state.error = false;
            })
            .addCase(fetchCartAction.rejected, (state, action) => {
                state.loading = false;
                state.cart_items = null;
                state.error = true;
                state.message = action.payload;
            })
            // add cart item action
            .addCase(addCartItemAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCartItemAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart_items.push(action.payload.cart_item);
                state.message = "product added in cart successfully";
            })
            .addCase(addCartItemAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            })
            // remove cart item action
            .addCase(removeCartItemAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCartItemAction.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.message = "product removed from cart successfully";
            })
            .addCase(removeCartItemAction.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "failed to remove product from cart";
            })
            // update cart item quantity
            .addCase(updateCartItemQuantityAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartItemQuantityAction.fulfilled, (state) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(updateCartItemQuantityAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });
    },
});

export const useCartSelector = () => {
    return useSelector((state) => state.cart);
};
export const { removeCartItem, updateCartItemQuantity, emptyCartItems } = cartSlice.actions;

export default cartSlice.reducer;
