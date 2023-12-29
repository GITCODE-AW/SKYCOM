import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConfig } from "../apiConfig";


export const getProductList = createAsyncThunk(
    'product-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.productList)
            if (!response.ok) {
                return rejectWithValue("error while fetching products")
            }
            const result = await response.json()
            return result
        } catch (error) {
            return rejectWithValue("error while fetching products")
        }
    }
)

export const getCategoryList = createAsyncThunk(
    'category-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.categoryList)
            if (!response.ok) {
                return rejectWithValue("error while fetching category")
            }
            const result = await response.json()
            return result
        } catch (error) {
            return rejectWithValue("error while fetching category")
        }
    }
)

export const getBannerList = createAsyncThunk(
    'banner-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.bannerList)
            if (!response.ok) {
                return rejectWithValue("error while fetching banner")
            }
            const result = await response.json()
            return result
        } catch (error) {
            return rejectWithValue("error while fetching banner")
        }
    }
)

export const fetchProductsByCategory = createAsyncThunk(
    'products-by-category',
    async (category_id, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.productsByCategory(category_id))
            const result = response.json()
            if (!response.ok) {
                return rejectWithValue("error while fetching product by category")
            } else {
                return result
            }

        } catch (error) {
            return rejectWithValue("error while fetching product by category")
        }
    }
)

export const fetchProductDetails = createAsyncThunk(
    'product-details',
    async (product_id, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.productDetail(product_id))
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue("failed to fetch product details")
            } else {
                return result
            }
        } catch (error) {
            return rejectWithValue("failed to fetch product details")
        }
    }
)

export const fetchFeaturedProducts = createAsyncThunk(
    'featured-products',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.featuredProducts)
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue("Failed to fetch products")
            }
            return result
        } catch (error) {
            return rejectWithValue("something went wrong")
        }
    }
)
