// Importing utility functions, authentication service, and Redux toolkit functions
import { getUser } from 'utils';
import authService from './auth.service';
import { enqueueSnackbar } from 'notistack';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Getting the user data from local storage
const user = getUser();
// Initial state for the authentication slice
const initialState = {
  login: {
    data: user || null, // User data, initialized with the user from local storage
    message: '', // Additional message from authentication actions
    isError: false, // Flag indicating if an error occurred
    isLoading: false // Flag indicating if the action is in progress
  },
  forgotPassword: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  resetPassword: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  enableTwoFactor: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  otpVerification: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  resendOtp: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

// Async thunk for handling user login
export const login = createAsyncThunk(
  'auth/login',
  async ({ data, verifyAccount, successCallback }, thunkAPI) => {
    try {
      const response = await authService.login(data);
      if (response.data.success) {
        const user = response.data.data;
        const { role, isTwoFactorEnable } = user?.user;

        if (role?.toLowerCase() === 'admin') {
          const auth_token = response.data.token;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('auth_token', JSON.stringify(auth_token));

          if (isTwoFactorEnable) {
            verifyAccount && verifyAccount();
            return;
          }

          successCallback && successCallback();
          return user;
        } else {
          enqueueSnackbar('Access denied', { variant: 'warning' });
          return thunkAPI.rejectWithValue('Access denied');
        }
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage = 'Something went wrong. Please try again';

      if (err.response && err.response.data.message === 'Incorrect email or password') {
        errorMessage = 'Invalid credentials';
      }

      enqueueSnackbar(errorMessage, { variant: err.response ? 'warning' : 'error' });
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for initiating the forgot password process
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ payload, successCallback }, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(payload);
      if (response.data.success) {
        successCallback && successCallback(payload.email);
        return response.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage = 'Something went wrong. Please try again';
      if (err.response && err.response.data.message) {
        errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, { variant: 'warning' });
      } else {
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for resetting user password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ formData, successCallback }, thunkAPI) => {
    try {
      const response = await authService.resetPassword(formData);
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback && successCallback();
        return response.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage = 'Something went wrong. Please try again';
      if (err.response && err.response.data.message) {
        errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, { variant: 'warning' });
      } else {
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for enabling the two factor auth
export const enableTwoFactor = createAsyncThunk(
  'auth/enableTwoFactor',
  async ({ payload }, thunkAPI) => {
    try {
      const response = await authService.enableTwoFactor(payload);
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        return response.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage = 'Something went wrong. Please try again';
      if (err.response && err.response.data.message) {
        errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, { variant: 'warning' });
      } else {
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for verifiying otp
export const otpVerification = createAsyncThunk(
  'auth/otpVerification',
  async ({ payload, successCallback }, thunkAPI) => {
    try {
      const response = await authService.otpVerification(payload);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage = 'Something went wrong. Please try again';
      if (err.response && err.response.data.message) {
        errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, { variant: 'warning' });
      } else {
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for resending otp
export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (_, thunkAPI) => {
    try {
      const response = await authService.resendOtp();
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage = 'Something went wrong. Please try again';
      if (err.response && err.response.data.message) {
        errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, { variant: 'warning' });
      } else {
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Creating the authentication slice using createSlice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Resetting the authentication state to initial values
    reset: (state) => {
      state.login = {
        data: user || null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.forgotPassword = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.resetPassword = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.enableTwoFactor = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.otpVerification = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.resendOtp = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    }
  },
  // Handling extra reducers for async thunks
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.data = null;
        state.login.message = '';
        state.login.isError = false;
        state.login.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.data = null;
        state.login.isError = true;
        state.login.isLoading = false;
        state.login.message = action.payload.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPassword.data = null;
        state.forgotPassword.message = '';
        state.forgotPassword.isError = false;
        state.forgotPassword.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPassword.isLoading = false;
        state.forgotPassword.data = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPassword.data = null;
        state.forgotPassword.isError = true;
        state.forgotPassword.isLoading = false;
        state.forgotPassword.message = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.data = null;
        state.resetPassword.message = '';
        state.resetPassword.isError = false;
        state.resetPassword.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.data = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.data = null;
        state.resetPassword.isError = true;
        state.resetPassword.isLoading = false;
        state.resetPassword.message = action.payload.message;
      })
      .addCase(enableTwoFactor.pending, (state) => {
        state.enableTwoFactor.data = null;
        state.enableTwoFactor.message = '';
        state.enableTwoFactor.isError = false;
        state.enableTwoFactor.isLoading = true;
      })
      .addCase(enableTwoFactor.fulfilled, (state, action) => {
        state.enableTwoFactor.isLoading = false;
        state.enableTwoFactor.data = action.payload;
      })
      .addCase(enableTwoFactor.rejected, (state, action) => {
        state.enableTwoFactor.data = null;
        state.enableTwoFactor.isError = true;
        state.enableTwoFactor.isLoading = false;
        state.enableTwoFactor.message = action.payload.message;
      })
      .addCase(otpVerification.pending, (state) => {
        state.otpVerification.data = null;
        state.otpVerification.message = '';
        state.otpVerification.isError = false;
        state.otpVerification.isLoading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.otpVerification.isLoading = false;
        state.otpVerification.data = action.payload;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.otpVerification.data = null;
        state.otpVerification.isError = true;
        state.otpVerification.isLoading = false;
        state.otpVerification.message = action.payload.message;
      })
      .addCase(resendOtp.pending, (state) => {
        state.resendOtp.data = null;
        state.resendOtp.message = '';
        state.resendOtp.isError = false;
        state.resendOtp.isLoading = true;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendOtp.isLoading = false;
        state.resendOtp.data = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtp.data = null;
        state.resendOtp.isError = true;
        state.resendOtp.isLoading = false;
        state.resendOtp.message = action.payload.message;
      });
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
