import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "@/api/base";
const initialState = {
  isLoading: false,
  razorpayOrder: null,
  orderList: [],
  orderDetails: null,
};

export const createRazorpayOrder = createAsyncThunk(
  "/order/createRazorpayOrder",
  async (amount) => {
    const response = await axios.post(`${API_BASE}/api/shop/order/razorpay/create`, {
      amount,
    });

    return response.data;
  }
);

export const confirmRazorpayOrder = createAsyncThunk(
  "/order/confirmRazorpayOrder",
  async (orderData) => {
    const response = await axios.post(`${API_BASE}/api/shop/order/razorpay/confirm`, orderData);
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(`${API_BASE}/api/shop/order/list/${userId}`);
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(`${API_BASE}/api/shop/order/details/${id}`);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create razorpay order
      .addCase(createRazorpayOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.razorpayOrder = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state) => {
        state.isLoading = false;
        state.razorpayOrder = null;
      })

      // confirm order after payment
      .addCase(confirmRazorpayOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(confirmRazorpayOrder.rejected, (state) => {
        state.isLoading = false;
      })

      // get orders
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      // get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
