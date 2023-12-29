import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { apiConfig } from "../apiConfig";


export const fetchOrderItemAction = createAsyncThunk(
    'get-orders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.getOrderedItems, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            })
            const result = await response.json()
            if (!response.ok) {
                throw new Error(result)
            }
            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const cancelOrderItemAction = createAsyncThunk(
    'cancel-order',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.cancelItem, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if (!response.ok) {
                throw new Error(result)
            }
            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const orderAllItemAction = createAsyncThunk(
    'order-all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.orderAllItems, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            })
            const result = await response.json()
            if (!response.ok) {
                throw new Error(result)
            }
            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
