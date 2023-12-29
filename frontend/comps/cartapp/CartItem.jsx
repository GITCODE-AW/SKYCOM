import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { urlConfig } from "../.././urlConfig";
import { removeCartItem, updateCartItemQuantity } from "../../slices/cartSlice";
import {
    removeCartItemAction,
    updateCartItemQuantityAction,
} from "../../actions/cartActions";
import { addNotification } from "../../slices/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";

function CartItem({ cart_item }) {
    const dispatch = useDispatch();

    const onQtyClick = (cart_item_id, quantity) => {
        if (quantity <= 4 && quantity >= 1) {
            dispatch(updateCartItemQuantity({ cart_item_id, quantity }));
            dispatch(updateCartItemQuantityAction({ cart_item_id, quantity }));
        } else if (quantity < 1) {
            dispatch(
                addNotification({
                    id: nanoid(),
                    message: "cannot reduce quantity",
                    status: "error",
                })
            );
        } else if (quantity > 4) {
            dispatch(
                addNotification({
                    id: nanoid(),
                    message: "we are sorry but cannot add more quantity",
                    status: "error",
                })
            );
        }
    };

    const onCartItemRemoveClick = (cart_item_id) => {
        dispatch(removeCartItemAction({ cart_item_id }));
        dispatch(removeCartItem(cart_item_id));
    };

    return (
        <div className="">
            <div className="main">
                <div className="">
                    <Link to={urlConfig.giveProductDetailPage(cart_item.product.id)}>
                        <img
                            className="img-fluid"
                            src={cart_item.product.image_link}
                            alt="Product 2"
                        />
                    </Link>
                </div>
                <div className="product-name">{cart_item.product.product_name}</div>

                <div className="cart-quantity-box">
                    <button 
                        className="cart-quantity-btn"
                        onClick={() => onQtyClick(cart_item.id, cart_item.quantity - 1)}
                    >
                        -
                    </button>
                    <div className="">
                        {cart_item.quantity}
                    </div>
                    <button
                        className="cart-quantity-btn"
                        onClick={() => onQtyClick(cart_item.id, cart_item.quantity + 1)}
                    >
                        +
                    </button>
                    <button
                        className="cart-quantity-btn"
                        onClick={() =>
                            onCartItemRemoveClick(cart_item.id, cart_item.quantity - 1)
                        }
                    >
                    <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </div>

                <div className="cart-item-price">
                    <span>{cart_item.product.price * cart_item.quantity}</span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;