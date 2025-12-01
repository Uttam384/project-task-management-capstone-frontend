import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ---- LOGIN THUNK ----
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      // fake login request
      await new Promise(res => setTimeout(res, 1000));

      return {
        user: {
          id: "u1",
          email,
          name: "Demo User",
        },
        token: "sample-jwt-token-123"
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);

// ---- REGISTER THUNK ----
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password, role }, thunkAPI) => {
    try {
      await new Promise(res => setTimeout(res, 1000));

      return {
        user: { id: "u2", username, email, role },
        token: "registered-jwt-token-456"
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // ===== LOGIN =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== REGISTER =====
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
