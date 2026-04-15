import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "@/api/base";

const initialState = {
  isAuthenticated: false,
  isAuthLoading: true,   // for checkAuth only
  isFormLoading: false,  // for register/forgot/reset
  user: null,
  error: null,
};

export const registerUser = createAsyncThunk("/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, formData, { withCredentials: true });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk("/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, formData, { withCredentials: true });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk("/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Logout failed");
    }
  }
);

export const checkAuth = createAsyncThunk("/auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/check-auth`, { withCredentials: true });
      return res.data;
    } catch (e) {
      // 401 is expected for logged-out users — not a real error
      return rejectWithValue(e.response?.status === 401 ? null : e.response?.data?.message);
    }
  }
);

export const forgotPassword = createAsyncThunk("/auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/forgot-password`, { email }, { withCredentials: true });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to send reset link");
    }
  }
);

export const resetPassword = createAsyncThunk("/auth/reset-password",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/reset-password/${token}`, { password }, { withCredentials: true });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Password reset failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── checkAuth ──────────────────────────────
      .addCase(checkAuth.pending,   (state) => { state.isAuthLoading = true; })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected,  (state) => {
        state.isAuthLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // ── loginUser ──────────────────────────────
      .addCase(loginUser.pending,   (state) => { state.isAuthLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected,  (state, action) => {
        state.isAuthLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      // ── logoutUser ─────────────────────────────
      .addCase(logoutUser.pending,   (state) => { state.isAuthLoading = true; })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected,  (state, action) => {
        state.isAuthLoading = false;
        state.error = action.payload;
      })

      // ── registerUser ───────────────────────────
      .addCase(registerUser.pending,   (state) => { state.isFormLoading = true; })
      .addCase(registerUser.fulfilled, (state) => { state.isFormLoading = false; })
      .addCase(registerUser.rejected,  (state, action) => {
        state.isFormLoading = false;
        state.error = action.payload;
      })

      // ── forgotPassword ─────────────────────────
      .addCase(forgotPassword.pending,   (state) => { state.isFormLoading = true; state.error = null; })
      .addCase(forgotPassword.fulfilled, (state) => { state.isFormLoading = false; })
      .addCase(forgotPassword.rejected,  (state, action) => {
        state.isFormLoading = false;
        state.error = action.payload;
      })

      // ── resetPassword ──────────────────────────
      .addCase(resetPassword.pending,   (state) => { state.isFormLoading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.isFormLoading = false; })
      .addCase(resetPassword.rejected,  (state, action) => {
        state.isFormLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;