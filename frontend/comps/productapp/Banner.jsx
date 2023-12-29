import React from 'react'
import BannerItem from './BannerItem'
import {useProductSelector} from '../../slices/productSlice'
import { nanoid } from '@reduxjs/toolkit'

function Banner() {
    const productState = useProductSelector()
    const bannerRenderer = (banners) =>{
        return banners.map((banner)=>(
            <BannerItem key={nanoid()} banner={banner}></BannerItem>
        ))
    } 

    return (
        <div className="banner">
            <div className="container">
                <div className="slider-container has-scrollbar">
                    {/* this is repetating element */}
                    {bannerRenderer(productState.banner_list)}
                </div>
            </div>
        </div>

    )
}

export default Banner