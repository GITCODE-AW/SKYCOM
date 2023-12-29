import React from 'react'
import ProductFeaturedItem from './ProductFeaturedItem'
import { nanoid } from '@reduxjs/toolkit'
import { useProductSelector } from '../../slices/productSlice'

function ProductFeatured() {
    const productState = useProductSelector()
    const FeaturedRenderer = (products) =>{
        return products.map(product =>{
            return <ProductFeaturedItem key={nanoid()} product={product}></ProductFeaturedItem>
        })
    }
    return (
        <div className="product-featured">
            <h2 className="title">Deals of the day</h2>
            <div className="showcase-wrapper has-scrollbar">
                {FeaturedRenderer(productState.featured_products)}
            </div>
        </div>

    )
}

export default ProductFeatured