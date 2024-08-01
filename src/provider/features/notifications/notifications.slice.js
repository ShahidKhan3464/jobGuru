// Importing enqueueSnackbar from notistack and notificationServices for API calls
import { enqueueSnackbar } from 'notistack';
import notificationsService from './notifications.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Initial state for the notifications slice
const initialState = {
  viewAll: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  markAllAsRead: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  clearAll: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

// Async thunk for viewing all notifications
export const viewAllNotifications = createAsyncThunk(
  'notifications/viewAll',
  async (_, thunkAPI) => {
    try {
      const response = await notificationsService.viewAllNotifications();
      if (response.data.success) {
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handle errors and show appropriate snackbar messages
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

// Async thunk for mark all as read notifications
export const markAllAsReadNotifications = createAsyncThunk(
  'notifications/markAllAsRead',
  async ({ successCallback }, thunkAPI) => {
    try {
      const response = await notificationsService.markAllAsReadNotifications();
      if (response.data.success) {
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handle errors and show appropriate snackbar messages
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

// Async thunk for clear all notifications
export const clearAllNotifications = createAsyncThunk(
  'notifications/clearAll',
  async ({ successCallback }, thunkAPI) => {
    try {
      const response = await notificationsService.clearAllNotifications();
      if (response.data.success) {
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handle errors and show appropriate snackbar messages
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

// Slice for the notifications actions and states
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Resetting the notifications state to initial state
    reset: (state) => {
      state.viewAll = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.markAllAsRead = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.clearAll = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    }
  },
  extraReducers: (builder) => {
    // Handling the pending, fulfilled, and rejected states for each async thunk
    builder
      .addCase(viewAllNotifications.pending, (state) => {
        state.viewAll.data = null;
        state.viewAll.message = '';
        state.viewAll.isError = false;
        state.viewAll.isLoading = true;
      })
      .addCase(viewAllNotifications.fulfilled, (state, action) => {
        state.viewAll.isLoading = false;
        state.viewAll.data = action.payload;
      })
      .addCase(viewAllNotifications.rejected, (state, action) => {
        state.viewAll.data = null;
        state.viewAll.isError = true;
        state.viewAll.isLoading = false;
        state.viewAll.message = action.payload.message;
      })
      .addCase(markAllAsReadNotifications.pending, (state) => {
        state.markAllAsRead.data = null;
        state.markAllAsRead.message = '';
        state.markAllAsRead.isError = false;
        state.markAllAsRead.isLoading = true;
      })
      .addCase(markAllAsReadNotifications.fulfilled, (state, action) => {
        state.markAllAsRead.isLoading = false;
        state.markAllAsRead.data = action.payload;
      })
      .addCase(markAllAsReadNotifications.rejected, (state, action) => {
        state.markAllAsRead.data = null;
        state.markAllAsRead.isError = true;
        state.markAllAsRead.isLoading = false;
        state.markAllAsRead.message = action.payload.message;
      })
      .addCase(clearAllNotifications.pending, (state) => {
        state.clearAll.data = null;
        state.clearAll.message = '';
        state.clearAll.isError = false;
        state.clearAll.isLoading = true;
      })
      .addCase(clearAllNotifications.fulfilled, (state, action) => {
        state.clearAll.isLoading = false;
        state.clearAll.data = action.payload;
      })
      .addCase(clearAllNotifications.rejected, (state, action) => {
        state.clearAll.data = null;
        state.clearAll.isError = true;
        state.clearAll.isLoading = false;
        state.clearAll.message = action.payload.message;
      });
  }
});

export const { reset } = notificationsSlice.actions;

export default notificationsSlice.reducer;
