import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    _id: string;
    name: string;
    email: string;
    token: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4400/api/auth",
        headers: {
            "Content-Type": "application/json",
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),

        }),
        register: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
