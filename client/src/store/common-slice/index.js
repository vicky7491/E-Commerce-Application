import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "@/api/base";
const initialState = {
  isLoading: false,
  featureImageList: [],
};

// ✅ Fetch Feature Images
export const getFeatureImages = createAsyncThunk(
  "feature/getFeatureImages",
  async () => {
    const response = await axios.get(`${API_BASE}/api/common/feature/get`);
    return response.data;
  }
);

// ✅ Add Feature Image
export const addFeatureImage = createAsyncThunk(
  "feature/addFeatureImage",
  async (image) => {
    const response = await axios.post(`${API_BASE}/api/common/feature/add`, { image });
    return response.data;
  }
);

// ✅ Delete Feature Image
export const deleteFeatureImage = createAsyncThunk(
  "feature/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(`${API_BASE}/api/common/feature/delete/${id}`);
    return { id, success: response.data.success };
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.featureImageList = state.featureImageList.filter((img) => img._id !== action.payload.id);
        }
      });
  },
});

export default commonSlice.reducer;
