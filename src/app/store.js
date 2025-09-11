import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

import { authApiSlice } from '../features/auth/authApiSlice';
import { customerApiSlice } from '../features/customers/customerApiSlice';
import {leadApiSlice} from "../features/leads/leadApiSlice";
import { statsApiSlice } from '../features/dashboard/statsApiSlice';

export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [customerApiSlice.reducerPath]: customerApiSlice.reducer,
        [leadApiSlice.reducerPath]: leadApiSlice.reducer,
        [statsApiSlice.reducerPath]: statsApiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApiSlice.middleware,
            customerApiSlice.middleware,
            leadApiSlice.middleware,
            statsApiSlice.middleware
        ),
    devTools: true
});