import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerApiSlice = createApi({
    reducerPath: 'customerApi',
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
    // Define tags for caching and invalidation
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        // GET all customers with pagination and search
        getCustomers: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) => 
                `/customers?page=${page}&limit=${limit}&search=${search}`,
            // The response is expected to be { customers: [], page, pages, total }
            providesTags: (result, error, arg) =>
                result ? [{ type: 'Customer', id: 'LIST' }] : [],
        }),
        // GET a single customer by ID
        getCustomerById: builder.query({
            query: (id) => `/customers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Customer', id }],
        }),
        // POST to add a new customer
        addCustomer: builder.mutation({
            query: (newCustomer) => ({
                url: '/customers',
                method: 'POST',
                body: newCustomer,
            }),
            // Invalidate the 'LIST' tag to trigger a refetch of the customer list
            invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
        }),
        // PUT to update a customer
        updateCustomer: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/customers/${id}`,
                method: 'PUT',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Customer', id: 'LIST' },
                { type: 'Customer', id: arg.id }
            ],
        }),
        // DELETE a customer
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
        }),
    }),
});

// Export the auto-generated hooks
export const { 
    useGetCustomersQuery, 
    useGetCustomerByIdQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApiSlice;