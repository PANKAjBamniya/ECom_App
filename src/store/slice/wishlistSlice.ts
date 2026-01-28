// store/slice/wishlistSlice.ts
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";


interface WishlistState {
    items: Product[];
}

const initialState: WishlistState = {
    items: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const exists = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (!exists) {
                state.items.push(action.payload);
                localStorage.setItem("wishlist", JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem("wishlist", JSON.stringify(state.items));
        },

    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
