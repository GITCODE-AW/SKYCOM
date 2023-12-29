import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useProductSelector } from '../../slices/productSlice'
import { fetchProductDetails } from '../../actions/productActions'
import LoadingScreen from '../general/LoadingScreen'
import { addCartItemAction } from '../../actions/cartActions'
import { addNotification } from '../../slices/notificationSlice'
import { nanoid } from '@reduxjs/toolkit'


function ProductDetail() {
    const { product_id } = useParams()
    const productState = useProductSelector()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductDetails(product_id))
    }, [])

    const onAddToCartClick = (message) =>{
        dispatch(addCartItemAction({product_id}))
        dispatch(addNotification({
            id : nanoid(),
            message : `${message} added to cart`,
            status : 'success'
        }))
    }

    if (productState.loading) {
        return <LoadingScreen message="product details are loading"></LoadingScreen>
    }

    if (productState.product_details) {
        return (
            <div className="product-detail-container">
                <div className="images">
                    <img src={productState.product_details.image_link} alt="Product" />
                </div>
                <div className="product">
                    <p>{productState.product_details.category.category_name}</p>
                    <h1>{productState.product_details.product_name}</h1>
                    <h2>{productState.product_details.price} INR</h2>
                    <h4 className='rating' >{productState.product_details.product_rating} 🌟 rating</h4>
                    <p className="desc">{productState.product_details.description}</p>
                    <div className="buttons">
                        <button onClick={()=>onAddToCartClick(productState.product_details.product_name)} >Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductDetail;
