import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConfig } from "../apiConfig";
import Cookies from "js-cookie";

export const userRegistrationAction = createAsyncThunk(
    "user/registerUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.registerUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue({ message: result.message });
            }

            return result.message;
        } catch (error) {
            return rejectWithValue({
                message: "An error occurred during registration.",
            });
        }
    }
);

export const userVerificationAction = createAsyncThunk(
    "user/verifyUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.verifyUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue({ message: result.message });
            }

            return { message: result.message };
        } catch (error) {
            return rejectWithValue({
                message: "An error occurred during registration.",
            });
        }
    }
);

export const userLoginAction = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.getToken, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            return rejectWithValue({
                message: "Something went wrong, please try again later",
            });
        }
    }
);

export const userLoginRefreshAction = createAsyncThunk(
    "user/login/refresh",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.refreshToken, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: getRefreshTokens() }),
            });

            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

export const userPasswordResetAction = createAsyncThunk(
    'user/reset',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.resetUser, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = response.json()

            if (!response.ok) {
                return rejectWithValue({ "message": "Failed to send otp, please try again later" })
            }
            return result
        } catch (error) {
            return { "message": "Something went wrong" }
        }
    }
)

export const userReverifyAction = createAsyncThunk(
    "user/reverifyUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.reverifyUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue({ message: result.message });
            }

            return { message: result.message };
        } catch (error) {
            return rejectWithValue({
                message: "An error occurred during registration.",
            });
        }
    }
);

export const fetchUserInfoAction = createAsyncThunk(
    'fetch-user-info',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiConfig.userInfo, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${Cookies.get('accessToken')}`
                }
            })
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue(result)
            }
            return result
        } catch (error) {
            return rejectWithValue('something went wrong')
        }
    }
)

export const updateUserInfoAction = createAsyncThunk(
    'update-user-info',
    async(data, {rejectWithValue}) =>{
        try {
            const response = await fetch(apiConfig.userInfo, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${Cookies.get('accessToken')}`
                },
                body:JSON.stringify(data)
            })
            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue(result)
            }
            return result
        } catch (error) {
            return rejectWithValue('something went wrong')
        }
    }
)

// helper functions
export const saveTokens = (tokensObj) => {
    Cookies.set("accessToken", tokensObj.access, { expires: 7, path: "/" });
    Cookies.set("refreshToken", tokensObj.refresh, { expires: 30, path: "/" });
};

export const saveAccessToken = (accessToken) => {
    Cookies.set('accessToken', accessToken, { expires: 7, path: '/' })
}

export const getRefreshTokens = () => {
    return Cookies.get("refreshToken");
};

export const getAccessToken = () => {
    return Cookies.get('accessToken')
}
