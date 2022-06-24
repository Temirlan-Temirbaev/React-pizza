import { configureStore } from '@reduxjs/toolkit';
import filter from './reducers/filterReducer';
import cart from './reducers/cartReducer';

export const store = configureStore({ reducer: { filter, cart } });
