import React from 'react'
import { useProductSelector } from '../../slices/productSlice'
import SideBarItem from './SideBarItem'
import { nanoid } from '@reduxjs/toolkit'

function SideBar() {
    const productState = useProductSelector()
    const categoryRenderer = (categories) =>{
        return categories.map(category=>{
            return <SideBarItem key={nanoid()} category={category} ></SideBarItem>
        })
    }

    return (
        <div className="sidebar has-scrollbar" data-mobile-menu>
            <div className="sidebar-category">
                <div className="sidebar-top">
                    <h2 className="sidebar-title">Category</h2>
                </div>

                <ul className="sidebar-menu-category-list">
                    {categoryRenderer(productState.category_list)}
                </ul>
            </div>
        </div>

    )
}

export default SideBar