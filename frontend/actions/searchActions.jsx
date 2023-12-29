import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConfig } from "../apiConfig";

export const fetchSearchedProducts = createAsyncThunk(
    'search-products',
    async (data, {rejectWithValue}) =>{
        try{
            const response = await fetch(apiConfig.searchProducts(data))
            if (!response.ok){
                throw new Error("No products found")
            }
            const result = await response.json()
            return result
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
