import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
    getBannerList,
    getCategoryList,
    getProductList,
    fetchProductsByCategory,
    fetchProductDetails,
    fetchFeaturedProducts,
} from "../actions/productActions";

const initialState = {
    loading: false,
    error: false,
    category_list: [],
    product_list: [],
    banner_list: [],
    products_by_category: [],
    product_by_search: [],
    product_details: null,
    featured_products: [],
    message: null,
};

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (buildercase) => {
        buildercase
            // banner list
            .addCase(getBannerList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBannerList.fulfilled, (state, action) => {
                state.loading = false;
                state.banner_list = action.payload;
            })
            .addCase(getBannerList.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            // product list
            .addCase(getProductList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                state.loading = false;
                state.product_list = action.payload;
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            // category list
            .addCase(getCategoryList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCategoryList.fulfilled, (state, action) => {
                state.loading = false;
                state.category_list = action.payload;
                state.error = false;
            })
            .addCase(getCategoryList.rejected, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            // products-by-category-list
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.products_by_category = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // product-details
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product_details = action.payload;
                state.error = false;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            })
            // featured products
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.featured_products = action.payload;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });
    },
});

export const useProductSelector = () => {
    return useSelector((state) => state.product);
};

// export const {} = productSlice.actions;
export default productSlice.reducer;
