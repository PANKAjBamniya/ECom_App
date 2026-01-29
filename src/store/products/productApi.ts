import { api } from "../services/api";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
            providesTags: ["Products"],
            refetchOnFocus: true,
            refetchOnReconnect: true,
        }),
        getProductById: builder.query({
            query: (id: string) => `/products/${id}`,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
} = productApi;
