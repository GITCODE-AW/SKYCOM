import React from 'react'
import { useParams } from 'react-router-dom'
import { useSearchState } from '../../slices/searchSlice'
import ProductListPage from './ProductListPage'

function searchProduct() {
    const {search_query} = useParams()
    const searchState = useSearchState()
    if (searchState.searched_products.length <= 0){
        return <span>no products available</span>
    }
    return (
        <div>
            <span>search for {search_query}</span>
            <ProductListPage products={searchState.searched_products}></ProductListPage>
        </div>
    )
}

export default searchProduct