import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "@/api/base";

const initialState = {
  isLoading:      false,
  productList:    [],
  productDetails: null,
  pagination:     null, // { page, limit, total, pages }
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams, page = 1, limit = 12 }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
      page,
      limit,
    });
    const result = await axios.get(`${API_BASE}/api/shop/products/get?${query}`);
    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(`${API_BASE}/api/shop/products/get/${id}`);
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── fetchAllFilteredProducts ────────────────────────────────────────
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading   = false;
        state.productList = action.payload.data;
        state.pagination  = action.payload.pagination ?? null;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading   = false;
        state.productList = [];
        state.pagination  = null;
      })

      // ─── fetchProductDetails ─────────────────────────────────────────────
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading       = false;
        state.productDetails  = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading       = false;
        state.productDetails  = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;