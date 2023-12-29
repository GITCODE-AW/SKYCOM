import React from 'react'
import SideBar from './SideBar';
import ProductFeatured from './ProductFeatured';
import ProductMain from './ProductMain';

function ProductContainer() {
    return (
        <div className="product-container">
            <div className="container">
                {/* Include your sidebar component here */}
                <SideBar></SideBar>
                <div className="product-box">
                    <ProductFeatured></ProductFeatured>
                    <ProductMain></ProductMain>
                </div>
            </div>
        </div>

    )
}

export default ProductContainer;