import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// every notification have id, message, and seviority representing error, or success
const initialState = {
    notifications: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        // send notification object while dispatching function
        addNotification: (state, action) => {
            state.notifications.push(action.payload)
        },
        // send id while dispatching function
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(notification => {
                return notification.id != action.payload
            })
        }
    }
})

export const useNotificationSelector = () => {
    return useSelector((state) => state.notification)
}
export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
