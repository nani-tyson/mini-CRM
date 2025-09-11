import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../features/auth/authApiSlice';
import authReducer from '../features/auth/authSlice';

import { customerApiSlice } from '../features/customers/customerApiSlice';


export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [customerApiSlice.reducerPath]: customerApiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApiSlice.middleware,
            // 3. Add the customer API slice middleware
            customerApiSlice.middleware
        ),
    devTools: true
});