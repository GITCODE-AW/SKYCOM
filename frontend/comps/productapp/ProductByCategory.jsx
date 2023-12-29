import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useProductSelector } from '../../slices/productSlice'
import { fetchProductsByCategory } from '../../actions/productActions'
import { useEffect } from 'react'
import ProductListPage from './ProductListPage'

function ProductByCategory() {
    const { category_id } = useParams()
    const dispatch = useDispatch()
    const productState = useProductSelector()

    useEffect(() => {
        dispatch(fetchProductsByCategory(category_id))
    }, []);

    return (
        <ProductListPage products={productState.products_by_category}></ProductListPage>
    )
}

export default ProductByCategory