import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import { fetchProductsApi, fetchSingleProductApi } from "../api/productApi";
import { getStoredProducts, setStoredProducts } from "../../utils/productStorage";

/* STATE TYPE */
interface ProductState {
    products: Product[];
    singleProduct: Product | null;
    loading: boolean;
    error: string | null;
}


/* INITIAL STATE */
const initialState: ProductState = {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
};

// Get All Product


export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            // check localStorage first
            const storedProducts = getStoredProducts();
            if (storedProducts && storedProducts.length > 0) {
                return storedProducts;
            }

            // fetch from API
            const products = await fetchProductsApi();

            //  save to localStorage
            setStoredProducts(products);

            return products;
        } catch (error) {
            console.log(error)
            return rejectWithValue("Failed to fetch products");
        }
    }
);



// Get Single Product

export const fetchSingleProduct = createAsyncThunk(
    "product/fetchSingleProduct",
    async (id: number, { rejectWithValue }) => {
        try {
            return await fetchSingleProductApi(id);
        } catch (error) {
            return rejectWithValue("Failed to fetch product");
        }
    }
);


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.singleProduct = null;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.singleProduct = action.payload;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
