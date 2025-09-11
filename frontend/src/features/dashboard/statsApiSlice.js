import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const statsApiSlice = createApi({
    reducerPath: 'statsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getStats: builder.query({
            query: () => '/stats',
        }),
    }),
});

export const { useGetStatsQuery } = statsApiSlice;
