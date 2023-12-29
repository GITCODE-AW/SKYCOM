import React from 'react'
import ProductMainItem from './ProductMainItem'
import { nanoid } from '@reduxjs/toolkit'

function ProductListPage({ products }) {
    const productRenderer = (products) => {
        return products.map((product) => {
            return <ProductMainItem key={nanoid()} product={product} ></ProductMainItem>
        })
    }

    return (

        <>
            <br />
            <div className="product-main">
                <div className="product-grid">
                    {productRenderer(products)}
                </div>
            </div>

        </>

    )
}

export default ProductListPage