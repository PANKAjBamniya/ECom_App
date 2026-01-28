import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzlhMmYxMDlmMmIxMmUzMWNjNDEzMSIsImlhdCI6MTc2OTU4NTIxNCwiZXhwIjoxNzcyMTc3MjE0fQ.ni2TUJwLHtTkYPjlDzvWcMB-XfhBsx2lgIcXRD8gQdE";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4400/api",
        prepareHeaders: (headers) => {
            headers.set("Authorization", TOKEN);
            return headers;
        },
    }),
    tagTypes: ["Products"],
    endpoints: () => ({}),
});
