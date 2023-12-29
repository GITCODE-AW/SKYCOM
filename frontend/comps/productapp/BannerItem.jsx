import React from 'react'
import { urlConfig } from '../../urlConfig'
import { Link } from 'react-router-dom'


function BannerItem({banner}) {
    return (
        <div className="slider-item">
            <img src={banner.image_link} alt="women's latest fashion sale" className="banner-img" />
            <div className="banner-content">
                <p className="banner-subtitle">{banner.title}</p>
                <h2 className="banner-title">{banner.heading}</h2>
                <p className="banner-text">starting at <b>₹ {banner.starting_price}</b></p>
                <Link to={ urlConfig.giveProductsByCategory(banner.category.id)} className="banner-btn">Shop now</Link>
            </div>
        </div>
    )
}

export default BannerItem
