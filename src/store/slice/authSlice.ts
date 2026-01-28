import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string;
    email: string;
    role: "admin" | "user";
}

interface AuthState {
    user: User | null;
    token: string | null;
    role: "admin" | "user" | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isError: string | null;
}

const storedAuth = JSON.parse(localStorage.getItem("auth") || "null");


const initialState: AuthState = {
    user: storedAuth?.user || null,
    token: storedAuth?.token || null,
    role: storedAuth?.user?.role || null,
    isAuthenticated: !!storedAuth,
    isLoading: false,
    isError: null,
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Loading: (state) => {
            state.isLoading = true;
            state.isError = null;
        },

        loginUser: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            state.isAuthenticated = true;
            state.isLoading = false;

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    user: action.payload.user,
                    token: action.payload.token,
                })
            );
        },

        registerUser: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            state.isAuthenticated = true;
            state.isLoading = false;

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    user: action.payload.user,
                    token: action.payload.token,
                })
            );
        },

        setError: (state, action: PayloadAction<string>) => {
            state.isError = action.payload;
            state.isLoading = false;
        },

        clearError: (state) => {
            state.isError = null;
        },

        logOutUser: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.isError = null;

            localStorage.removeItem("auth");
        },
    },
});

export const {
    loginUser,
    registerUser,
    Loading,
    setError,
    clearError,
    logOutUser,
} = authSlice.actions;

export default authSlice.reducer;
