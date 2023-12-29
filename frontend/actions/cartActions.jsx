import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { apiConfig } from "../apiConfig";


export const fetchCartAction = createAsyncThunk(
    "fetch-cart-items",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.cartList, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue(result.detail);
            }
            return result;
        } catch (error) {
            return rejectWithValue("Failed to fetch cart items");
        }
    }
);


export const addCartItemAction = createAsyncThunk(
    'add-cart-item',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.cartList, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue("Failed to add cart items");
            }
            return result;
        } catch (error) {
            return rejectWithValue("Failed to add cart items");
        }
    }
)


export const removeCartItemAction = createAsyncThunk(
    'remove-cart-item',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.cartList, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue("Failed to delete cart items");
            }
            return result;
        } catch (error) {
            return rejectWithValue("Failed to delete cart items");
        }
    }
)


export const updateCartItemQuantityAction = createAsyncThunk(
    'update-cart-item',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.cartList, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue(result)
            }
            return result
        } catch (error) {
            return rejectWithValue('something went wrong')
        }
    }
)
