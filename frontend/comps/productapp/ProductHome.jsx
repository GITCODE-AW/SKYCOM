import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Banner from './Banner'
import ProductContainer from './ProductContainer'
import Services from './Services'
import { getProductList, getCategoryList, getBannerList, fetchFeaturedProducts } from '../../actions/productActions'
import { useProductSelector } from '../../slices/productSlice'

function ProductHome() {
    const productState = useProductSelector()
    const dispatch = useDispatch()
    useEffect(() => {
        if (productState.category_list.length <= 0) {
            dispatch(getCategoryList())

        }
        if (productState.product_list.length <= 0) {
            dispatch(getProductList())
        }
        if (productState.banner_list.length <= 0) {
            dispatch(getBannerList())
        }
        if (productState.featured_products.length <= 0){
            dispatch(fetchFeaturedProducts())
        }
    }, []);

    return (
        <>
            <Banner></Banner>
            <ProductContainer></ProductContainer>
            <Services></Services>
        </>
    )
}

export default ProductHome