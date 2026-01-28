import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                //  quantity increase
                existingItem.quantity += 1;
            } else {
                //  new item
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }

            // persist cart
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        decrease: (state, action: PayloadAction<number>) => {
            const item = state.items.find(
                (i) => i.id === action.payload
            );

            if (!item) return;

            item.quantity--;

            if (item.quantity === 0) {
                state.items = state.items.filter(
                    (i) => i.id !== action.payload
                );
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, decrease } = cartSlice.actions;
export default cartSlice.reducer;
