const baseDomain = "http://localhost:8000"
const userURL = `${baseDomain}/user`
const productURL = `${baseDomain}/product`
const cartURL = `${baseDomain}/cart`
const orderURL = `${baseDomain}/orders`

export const apiConfig = {
    // user urls
    getToken : `${userURL}/token/`,
    refreshToken : `${userURL}/token/refresh/`,
    registerUser : `${userURL}/register/`,
    verifyUser : `${userURL}/verify/`,
    resetUser : `${userURL}/reset/`,
    reverifyUser : `${userURL}/reverify/`,
    userInfo : `${userURL}/info/`,
    // product urls
    productList : `${productURL}/product-list/`,
    categoryList : `${productURL}/category-list/`,
    bannerList : `${productURL}/banner-list/`,
    productDetail: (product_id) => `${productURL}/product-detail/${product_id}/`,
    productsByCategory : (category_id) => `${productURL}/products-by-category/${category_id}/`,
    featuredProducts : `${productURL}/featured-list/`,
    searchProducts : (search_query) => `${productURL}/search-product/${search_query}`,
    // cart urls
    cartList : `${cartURL}/items/`,
    // order urls
    getOrderedItems : `${orderURL}/get-all/`,
    orderAllItems : `${orderURL}/order-all/`,
    cancelItem : `${orderURL}/cancel-one/`,
}