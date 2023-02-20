import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchProducts } from "./fetchProducts";
import { ProductType } from "./productTypes";

export interface ProductsState {
  productsData: ProductType[];
  status: "success" | "loading" | "failed" | "pending";
}

const initialState: ProductsState = {
  productsData: [],
  status: "pending",
};

export const setProducts = createAsyncThunk(
  "products/fetchProducts",
  fetchProducts
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<number>) => {
      const productsWithoutRemovedItem = state.productsData.filter(
        (item) => item.id !== action.payload
      );
      state.productsData = productsWithoutRemovedItem;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.productsData = action.payload ?? [];
      })
      .addCase(setProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { removeProduct } = productsSlice.actions;

export const getProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
