const userURL = "user"
const productURL = "product"
const cartURL = 'cart'

export const urlConfig = {
    // home url
    home : '/',
    // user urls
    userPanel : `/${userURL}/user-panel/`,
    login : `/${userURL}/signin/`,
    register : `/${userURL}/signup/`,
    verify : `/${userURL}/verify/`,
    reset : `/${userURL}/password-reset/`,
    reverify : `/${userURL}/re-verify/`,
    logout : `/${userURL}/signout/`,
    // product urls
    ProductsByCategory : `/${productURL}/product-by-category/:category_id/`,
    giveProductsByCategory : (category_id) => `/${productURL}/product-by-category/${category_id}/`,
    ProductDetailPage : `/${productURL}/product-details/:product_id/`,
    giveProductDetailPage : (product_id) => `/${productURL}/product-details/${product_id}/`,
    searchProductsPage : `/${productURL}/search/:search_query/`,
    givesearchProductsPage : (search_query) => `/${productURL}/search/${search_query}/`,
    // cart urls
    CartListPage : `/${cartURL}/cart-list/`,
    addCartItem : `/${cartURL}/cart-list/add/:product_id/`,
    giveaddCartItem : (product_id) => `/${cartURL}/cart-list/add/${product_id}/`,
}