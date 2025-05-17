import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/interface/product';

interface SelectedProductsState {
  products: Product[];
}

const initialState: SelectedProductsState = {
  products: [],
};

export const selectedProductsSlice = createSlice({
  name: 'selectedProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      if (!state.products.find((p) => p.id === action.payload.id)) {
        state.products.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = selectedProductsSlice.actions;
export default selectedProductsSlice.reducer;
