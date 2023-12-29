import React from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification, useNotificationSelector } from '../../slices/notificationSlice';


const SideNotification = () => {
    const notificationState = useNotificationSelector()
    const dispatch = useDispatch()

    const onNotificationCloseClick = (id) =>{
        dispatch(removeNotification(id))
    }

    const notificationRenderer = (notifications) => {
        return notifications.map(notification => {
            return (
                <div key={notification.id} className={`side-notification-item ${notification.status}`}>
                    <span>{notification.message}</span>
                    <button onClick={()=>onNotificationCloseClick(notification.id)} type='button'><ion-icon name="close-outline"></ion-icon></button>
                </div>
            )
        })
    }

    return (
        <div className="side-notification-box">
            {notificationRenderer(notificationState.notifications)}
        </div>
    );
};

export default SideNotification;
