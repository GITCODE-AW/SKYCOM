import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
    userRegistrationAction,
    userVerificationAction,
    userLoginAction,
    userLoginRefreshAction,
    userPasswordResetAction,
    userReverifyAction,
    fetchUserInfoAction,
    updateUserInfoAction
} from "../actions/userActions";
import { saveTokens, saveAccessToken } from "../actions/userActions";

const initialState = {
    loading: false,
    error: false,
    message: "",
    is_logged_in: false,
    user_info: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        emptyUserState: (state) => {
            state.loading = false;
            state.error = false;
            state.message = "";
            state.message = "";
        },

        setIsLoggedIn : (state, action) =>{
            state.is_logged_in = action.payload
        }
    },
    extraReducers: (buidercase) => {
        buidercase
            // user registration action
            .addCase(userRegistrationAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegistrationAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload;
            })
            .addCase(userRegistrationAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            })
            // user verify action
            .addCase(userVerificationAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(userVerificationAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(userVerificationAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            })
            // user login action
            .addCase(userLoginAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLoginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = "User logged in successfully"
                state.is_logged_in = true
                saveTokens(action.payload);
            })
            .addCase(userLoginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.detail;
                state.is_logged_in = false
            })
            // token refresh action
            .addCase(userLoginRefreshAction.pending, (state) => {
                state.loading = false;
                state.is_logged_in = false;
            })
            .addCase(userLoginRefreshAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                saveAccessToken(action.payload.access);
                state.is_logged_in = true
            })
            .addCase(userLoginRefreshAction.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.is_logged_in = false;
            })
            // password reset action
            .addCase(userPasswordResetAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(userPasswordResetAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
            })
            .addCase(userPasswordResetAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            })
            // user re-verify actoin
            .addCase(userReverifyAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(userReverifyAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
            })
            .addCase(userReverifyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload.message;
            })
            // user info
            .addCase(fetchUserInfoAction.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserInfoAction.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.user_info = action.payload
            }).addCase(fetchUserInfoAction.rejected, (state) => {
                state.loading = false
                state.error = true
                state.message = "failed to fetch user info"
            })
            // update user actions
            .addCase(updateUserInfoAction.pending, (state)=>{
                state.loading = true
            })
            .addCase(updateUserInfoAction.fulfilled, (state, action)=>{
                state.loading = false
                state.error = false
                state.user_info = action.payload
            })
            .addCase(updateUserInfoAction.rejected, (state)=>{
                state.loading = false
                state.error = true
                state.message = "failed to update information, something went wrong"
            })
    },
});


export const useUserState = () => {
    return useSelector((state) => state.user);
};

export const { emptyUserState, setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
