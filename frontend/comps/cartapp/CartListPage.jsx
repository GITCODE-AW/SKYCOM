import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { emptyCartItems, useCartSelector } from '../../slices/cartSlice'
import { fetchCartAction } from '../../actions/cartActions'
import CartItem from './CartItem'
import { nanoid } from '@reduxjs/toolkit'
import LoadingScreen from '../../comps/general/LoadingScreen'
import { orderAllItemAction } from '../../actions/orderActions'
import { addNotification } from '../../slices/notificationSlice'
import { useUserState } from '../../slices/userSlice'
import { Link } from 'react-router-dom'
import { urlConfig } from '../../urlConfig'

function CartListPage() {
    const cartState = useCartSelector()
    const userState = useUserState()
    const dispatch = useDispatch()

    const cartItemRenderer = (itemArr) => {
        if (cartState.cart_items.length <= 0) {
            return <div>Your cart is empty</div>
        }
        return itemArr.map(item => {
            return <CartItem cart_item={item} key={nanoid()} ></CartItem>
        })
    }


    const totalPrice = (itemArr) => {
        let price = 0
        itemArr.forEach(element => {
            price += parseInt(element.product.price) * parseInt(element.quantity)
        });
        return price
    }

    useEffect(() => {
        if (userState.is_logged_in){
            dispatch(fetchCartAction())
        }
    }, [])


    const onOrderAllClick = () =>{
        dispatch(orderAllItemAction())
        dispatch(emptyCartItems())
        dispatch(addNotification({
            id : nanoid(),
            message : 'ordered all products from cart successfully',
            status : 'success'
        }))
    }

    if (!userState.is_logged_in){
        return <Link to={urlConfig.login}>Login to view this page</Link>
    }

    if (cartState.loading) {
        return <LoadingScreen message="loading or updating cart, please wait..."></LoadingScreen>
    }

    const orderAbility = cartState.cart_items.length > 0


    return (
        <>
            <br />
            <div className="cart-card">
                <div className="row">
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            </div>
                        </div>
                        {cartItemRenderer(cartState.cart_items)}
                    </div>
                    {orderAbility && (
                        <div className="col-md-4 summary">
                            <div><h5><b>Summary</b></h5></div>
                            <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                                <div className="col">TOTAL PRICE</div>
                                <div className="col text-right">₹ {totalPrice(cartState.cart_items)}</div>
                            </div>
                            <button onClick={onOrderAllClick} className="btn">ORDER NOW</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartListPage
