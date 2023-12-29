import React from 'react'
import { useProductSelector } from '../../slices/productSlice'
import ProductMainItem from './ProductMainItem'
import { nanoid } from '@reduxjs/toolkit'

function ProductMain() {
    const productState = useProductSelector()
    const productRenderer = (products) =>{
        return products.map((product)=>{
            return <ProductMainItem key={nanoid()} product={product} ></ProductMainItem>
        })
    }
    return (
        <div className="product-main">
            <h2 className="title">All Products</h2>

            <div className="product-grid">
                {productRenderer(productState.product_list)}
            </div>
        </div>
    )
}

export default ProductMain