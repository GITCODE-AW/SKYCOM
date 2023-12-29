import React from 'react'
import { Link } from 'react-router-dom'
import { urlConfig } from '../../urlConfig'

function ProductMainItem({ product }) {
    return (
        <div className="showcase">
            <Link to={urlConfig.giveProductDetailPage(product.id)}>
                <div className="showcase-banner">
                    <img src={product.image_link} alt="Mens Winter Leathers Jackets" width="300" className="product-img default" />
                    <img src={product.alt_image_link} alt="Mens Winter Leathers Jackets" width="300" className="product-img hover" />
                </div>
            </Link>

            <div className="showcase-content">
                <a href="#" className="showcase-category">{product.category.category_name}</a>
                <a href="#">
                    <h3 className="showcase-title">{product.product_name}</h3>
                </a>

                <div className="showcase-rating">
                    {product.product_rating} <ion-icon name="star"></ion-icon>
                </div>

                <div className="price-box">
                    <p className="price">{product.price}</p>
                    <del>{product.maximum_price}</del>
                </div>
            </div>
        </div>
    )
}

export default ProductMainItem