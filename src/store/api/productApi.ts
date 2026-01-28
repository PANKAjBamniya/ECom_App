import type { Product } from "../../types/product";

export const fetchProductsApi = async (): Promise<Product[]> => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products;
};

export const fetchSingleProductApi = async (
    id: number
): Promise<Product> => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
};
