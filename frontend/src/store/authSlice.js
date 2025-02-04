import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import { AUTH_ENDPOINTS } from "../utility/url";

const { LOGIN } = AUTH_ENDPOINTS;

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    error: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
});

export const { setIsLoading, setUser, setError, clearAuth } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
    const toastId = toast.loading("Logging In...");
    dispatch(setIsLoading(true));
    try {
        const response = await axios.post(LOGIN, credentials);

        if (!response?.data?.success) {
            toast.dismiss(toastId);
            toast.error(response?.data?.error || "Failed to login");
            dispatch(setError(response?.data?.error || "Failed to login"));
            dispatch(setIsLoading(false));
            return;
        }

        toast.dismiss(toastId);
        toast.success("Login Success");
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        dispatch(setUser({ user, token }));
        dispatch(setIsLoading(false));
    } catch (error) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.error || "Error during login");
        dispatch(setError(error?.response?.data?.error || "Error during login"));
        dispatch(setIsLoading(false));
    }
};

export const register = (userData) => async (dispatch) => {
    const toastId = toast.loading("Registering...");
    dispatch(setIsLoading(true));
    try {
        const response = await axios.post(AUTH_ENDPOINTS.REGISTER, userData);
        if (!response?.data?.success) {
            toast.dismiss(toastId);
            toast.error(response?.data?.error || "Registration failed");
            dispatch(setError(response?.data?.error || "Registration failed"));
            dispatch(setIsLoading(false));
            return;
        }

        toast.dismiss(toastId);
        toast.success("Registration successful");
        dispatch(setIsLoading(false));
    } catch (error) {
        console.log(error)
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.error || "Error during registration");
        dispatch(setError(error?.response?.data?.error || "Error during registration"));
        dispatch(setIsLoading(false));
    }
};


export const logout = () => (dispatch) => {
    toast.success("User logged out successfully");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(clearAuth());
};

export default authSlice.reducer;
