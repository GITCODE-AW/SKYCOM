import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { userLoginRefreshAction } from "../actions/userActions"
import { urlConfig } from "../urlConfig"
// compos imports
import Register from "../comps/userapp/Register"
import Verify from "../comps/userapp/Verify"
import Login from "../comps/userapp/Login"
import Reset from "../comps/userapp/Reset"
import Reverify from "../comps/userapp/Reverify"
import ProductHome from "../comps/productapp/ProductHome"
import Footer from '../comps/general/Footer'
import Header from "../comps/general/Header"
import ProductByCategory from "../comps/productapp/ProductByCategory"
import ProductDetail from "../comps/productapp/ProductDetail"
import CartListPage from "../comps/cartapp/CartListPage"
import SideNotification from "../comps/general/SideNotification"
import UserPanel from "../comps/userapp/userPanel"
import searchProduct from "../comps/productapp/searchProduct"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userLoginRefreshAction())
        const refreshTokenInterval = setInterval(() => {
            dispatch(userLoginRefreshAction())
        }, 300000);

        return () => {
            clearInterval(refreshTokenInterval)
        };
    }, []);

    return (
        <>
            <Header></Header>
            <main>
                <SideNotification></SideNotification>
                <Routes>
                    {/* home route */}
                    <Route path={urlConfig.home} Component={ProductHome} ></Route>
                    {/* user routes */}
                    <Route path={urlConfig.userPanel} Component={UserPanel}></Route>
                    <Route path={urlConfig.register} Component={Register} ></Route>
                    <Route path={urlConfig.verify} Component={Verify}></Route>
                    <Route path={urlConfig.login} Component={Login}></Route>
                    <Route path={urlConfig.reset} Component={Reset}></Route>
                    <Route path={urlConfig.reverify} Component={Reverify}></Route>
                    {/* product  routes */}
                    <Route path={urlConfig.ProductsByCategory} Component={ProductByCategory} ></Route>
                    <Route path={urlConfig.ProductDetailPage} Component={ProductDetail} ></Route>
                    <Route path={urlConfig.searchProductsPage} Component={searchProduct} ></Route>
                    {/* cart routes */}
                    <Route path={urlConfig.CartListPage} Component={CartListPage}></Route>
                </Routes>
            </main>
            <Footer></Footer>
        </>
    )
}

export default App
