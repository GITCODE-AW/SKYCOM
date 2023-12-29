import React from "react";
import { Link } from "react-router-dom";
import { urlConfig } from "../../urlConfig";
import { addCartItemAction } from "../../actions/cartActions";
import { addNotification } from "../../slices/notificationSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

function ProductFeaturedItem({ product }) {
    const dispatch = useDispatch()

    const onAddToCartClick = (product_id, product_name) =>{
        dispatch(addCartItemAction({product_id}))
        dispatch(addNotification({
            id : nanoid(),
            message : `${product_name} added to cart`,
            status : 'success'
        }))
    }

    return (
        <div className="showcase-container">
            <div className="showcase">
                <div className="showcase-banner">
                    <img
                        src={product.image_link}
                        alt="product-image"
                        className="showcase-img"
                    />
                </div>
                <div className="showcase-content">
                    <div className="showcase-rating">{product.product_rating}★ ratings</div>
                    <h3 className="showcase-title">
                        <a href="#" className="showcase-title">
                            {product.product_name}
                        </a>
                    </h3>
                    <p className="showcase-desc">
                        {product.description}
                    </p>
                    <div className="price-box">
                        <p className="price">{product.price} INR</p>
                        <del>{product.maximum_price} INR</del>
                    </div>
                    <button className="add-cart-btn" onClick={()=>onAddToCartClick(product.id, product.product_name)}>add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductFeaturedItem;
