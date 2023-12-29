import React from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { cancelOrderItemAction } from '../../actions/orderActions';
import { addNotification } from '../../slices/notificationSlice';
import { useOrderState } from '../../slices/orderSlice';

const UserOrderPanelItem = ({ className }) => {
    const orderState = useOrderState();
    const dispatch = useDispatch();

    const OrderItemRenderer = (Orders) =>Orders.map(order=>{
        return (
            <OrderItem key={order.id} order={order} onCancelOrderItem={onCancelOrderItem} ></OrderItem>
        )
    })

    const onCancelOrderItem = (id) =>{
        dispatch(cancelOrderItemAction({order_item_id : id}))
        dispatch(cancelOrderItemAction(id))
        dispatch(addNotification({
            id : nanoid(),
            message : 'cancelled this order',
            status : 'success'
        }))
    }

    if (orderState.order_items.length <= 0) {
        return (
            <div className={`user-panel-item ${className}`}>
                <h3>No orders to show</h3>
            </div>
        );
    }

    return (
        <div className={`user-panel-item ${className}`}>
            <h3>Order History</h3>
            {OrderItemRenderer(orderState.order_items)}
        </div>
    );
};

export default UserOrderPanelItem;


// order item
const OrderItem = ({order, onCancelOrderItem}) => {
    if (order.delivery_stat !== 'cancelled')
        return (
            <div className="order-item">
                <div className="order-item-img">
                    <img src={order.product.image_link} alt="order product" />
                </div>
                <div className="order-item-details">
                    <div className="order-item-name">
                        {order.product.product_name}
                    </div>
                    <div className="order-item-total">
                        total {order.total_price} INR
                    </div>
                    <div className="order-item-quantity">
                        qty {order.quantity}
                    </div>
                    <div className="order-item-status">
                        {order.delivery_stat}
                    </div>
                    <button className='order-item-cancel'  onClick={()=>onCancelOrderItem(order.id)}>
                        Cancel this order ? 
                    </button>
                </div>
            </div>
        )
}