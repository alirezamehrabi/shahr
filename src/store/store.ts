import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';
import selectedProductsReducer from './selectedProductsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from '../services/usersApi';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    selectedProducts: selectedProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
