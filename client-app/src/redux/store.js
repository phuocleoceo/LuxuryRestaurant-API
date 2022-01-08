import authenticationSlice from './slices/authenticationSlice';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        authentication: authenticationSlice,
        cart: cartSlice
    },
});