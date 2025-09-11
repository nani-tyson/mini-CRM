import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../features/auth/authApiSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApiSlice.middleware),
    devTools: true // Enable Redux DevTools
});