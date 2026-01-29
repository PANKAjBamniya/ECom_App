import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import auth from "./slice/authSlice";
import wishlist from "./slice/wishlistSlice";
import cart from "./slice/cartSlice";
import theme from "./slice/themeSlice";
import order from "./slice/orderSlice";
import language from "./slice/languageSlice";

export const store = configureStore({
    reducer: {
        auth,
        wishlist,
        cart,
        theme,
        order,
        language,
        [api.reducerPath]: api.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;