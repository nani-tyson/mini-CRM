import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;