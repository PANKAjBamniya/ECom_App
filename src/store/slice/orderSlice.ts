import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types/product";

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: JSON.parse(localStorage.getItem("orders") || "[]"),
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        placeOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
            localStorage.setItem("orders", JSON.stringify(state.orders));
        },
    },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
