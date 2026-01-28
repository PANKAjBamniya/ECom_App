import type { Product } from "../types/product";

const PRODUCTS_KEY = "products";

export const getStoredProducts = (): Product[] | null => {
    try {
        const data = localStorage.getItem(PRODUCTS_KEY);
        if (!data) return null;

        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : null;
    } catch (error) {
        console.error("Invalid products in localStorage, clearing...");
        localStorage.removeItem(PRODUCTS_KEY);
        return null;
    }
};

export const setStoredProducts = (products: Product[]) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};
