import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { fetchSearchedProducts } from "../actions/searchActions";


const initialState = {
    loading : false,
    message : null,
    searched_products : []
}

const searchSlice = createSlice({
    name : 'search',
    initialState,
    reducers : {},
    extraReducers : (buildercase) =>{
        buildercase
        .addCase(fetchSearchedProducts.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchSearchedProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.searched_products = action.payload
        })
        .addCase(fetchSearchedProducts.rejected, (state)=>{
            state.loading = false
            state.message = "Failed to fetch products"
        })
    }
})

export const {} = searchSlice.actions

export const useSearchState = () =>{
    return useSelector((state)=>state.search)
}
export default searchSlice.reducer;
