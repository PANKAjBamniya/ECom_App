import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import auth from "./slice/authSlice";
import product from "./slice/productSlice";
import wishlist from "./slice/wishlistSlice";
import cart from "./slice/cartSlice"
import theme from "./slice/themeSlice"
import order from "./slice/orderSlice"
import language from "./slice/languageSlice"

export const store = configureStore({
    reducer: {
        auth,
        product,
        wishlist,
        cart,
        theme,
        order,
        language,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
