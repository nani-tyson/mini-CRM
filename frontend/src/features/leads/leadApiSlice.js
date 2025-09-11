import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const leadApiSlice = createApi({
    reducerPath: 'leadApi',
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
    tagTypes: ['Lead'],
    endpoints: (builder) => ({
        getLeadsForCustomer: builder.query({
            // The query now takes the customerId to build the URL
            query: (customerId) => `/customers/${customerId}/leads`,
            providesTags: (result, error, customerId) =>
                result ? [{ type: 'Lead', id: 'LIST' }] : [],
        }),
        addLead: builder.mutation({
            query: ({ customerId, ...newLead }) => ({
                url: `/customers/${customerId}/leads`,
                method: 'POST',
                body: newLead,
            }),
            invalidatesTags: [{ type: 'Lead', id: 'LIST' }],
        }),
        updateLead: builder.mutation({
            query: ({ customerId, leadId, ...updatedData }) => ({
                url: `/customers/${customerId}/leads/${leadId}`,
                method: 'PUT',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Lead', id: 'LIST' }],
        }),
        deleteLead: builder.mutation({
            query: ({ customerId, leadId }) => ({
                url: `/customers/${customerId}/leads/${leadId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Lead', id: 'LIST' }],
        }),
    }),
});

export const { 
    useGetLeadsForCustomerQuery,
    useAddLeadMutation,
    useUpdateLeadMutation,
    useDeleteLeadMutation,
} = leadApiSlice;
