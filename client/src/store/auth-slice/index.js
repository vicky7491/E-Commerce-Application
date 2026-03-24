import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "@/api/base";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData, { rejectWithValue }) => {
    try {
    const response = await axios.post(
      `${API_BASE}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) { 
     return rejectWithValue(
      error.response?.data?.message || "Registration failed");
  }
}
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async (_, { rejectWithValue }) => {
    try {
    const response = await axios.post(
      `${API_BASE}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async (_, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${API_BASE}/api/auth/check-auth`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.status === 401 ? null : error.response?.data?.message
    );
  }
}
);

export const forgotPassword = createAsyncThunk(
  "/auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset link"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/auth/reset-password",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
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
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Forgot Password
.addCase(forgotPassword.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(forgotPassword.fulfilled, (state) => {
  state.isLoading = false;
  state.error = null;
})
.addCase(forgotPassword.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})

// Reset Password
.addCase(resetPassword.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(resetPassword.fulfilled, (state) => {
  state.isLoading = false;
  state.error = null;
})
.addCase(resetPassword.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
