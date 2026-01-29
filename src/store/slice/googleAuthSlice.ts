import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GoogleUser {
    name: string;
    email: string;
    picture?: string;
}

interface GoogleAuthState {
    user: GoogleUser | null;
    isLoggedIn: boolean;
}

const storedUser = JSON.parse(localStorage.getItem("googleAuth") || "null");

const initialState: GoogleAuthState = {
    user: storedUser,
    isLoggedIn: !!storedUser,
};

const googleAuthSlice = createSlice({
    name: "googleAuth",
    initialState,
    reducers: {
        googleLoginSuccess: (state, action: PayloadAction<GoogleUser>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("googleAuth", JSON.stringify(action.payload));
        },
        googleLogout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("googleAuth");
        },
    },
});

export const { googleLoginSuccess, googleLogout } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;
