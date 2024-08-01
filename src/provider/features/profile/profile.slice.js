// Importing enqueueSnackbar for displaying notifications, profileService for profile-related API calls,
import { getUser } from 'utils';
import { enqueueSnackbar } from 'notistack';
import profileService from './profile.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Getting the user data from local storage
const user = getUser();

// Initial state for profile-related data
const initialState = {
  viewProfile: {
    data: user || null,
    message: '',
    isError: false,
    isLoading: false
  },
  updateProfile: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  updateProfileImage: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  checkCurrentPassword: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  changePassword: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

// Async thunk for viewing the user profile
export const viewProfile = createAsyncThunk(
  'profile/viewProfile',
  async (_, thunkAPI) => {
    try {
      const response = await profileService.viewProfile();
      if (response.data.success) {
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
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

// Async thunk for updating the user profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await profileService.updateProfile(data);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        enqueueSnackbar('Profile updated successfully', { variant: 'success' });
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
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

// Async thunk for updating the user profile image
export const updateProfileImage = createAsyncThunk(
  'profile/updateProfileImage',
  async ({ formData, successCallback }, thunkAPI) => {
    try {
      const response = await profileService.updateProfileImage(formData);
      if (response.data.success) {
        successCallback && successCallback(response.data?.data?.url);
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
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

// Async thunk for checking the current password
export const checkCurrentPassword = createAsyncThunk(
  'profile/checkCurrentPassword',
  async ({ currentPassword, successCallback }, thunkAPI) => {
    try {
      const response = await profileService.checkCurrentPassword(
        currentPassword
      );
      if (response.data.success) {
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
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

// Async thunk for changing the user password
export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async ({ data }, thunkAPI) => {
    try {
      const response = await profileService.changePassword(data);
      if (response.data.success) {
        enqueueSnackbar('Password updated successfully', {
          variant: 'success'
        });
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
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

// Creating the profile slice with initial state and reducers
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Resetting profile state to initial state
    reset: (state) => {
      state.viewProfile = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.updateProfile = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.updateProfileImage = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.checkCurrentPassword = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.changePassword = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    }
  },
  // Handling extra reducers (async thunks)
  extraReducers: (builder) => {
    builder
      .addCase(viewProfile.pending, (state) => {
        state.viewProfile.data = null;
        state.viewProfile.message = '';
        state.viewProfile.isError = false;
        state.viewProfile.isLoading = true;
      })
      .addCase(viewProfile.fulfilled, (state, action) => {
        state.viewProfile.isLoading = false;
        state.viewProfile.data = action.payload;
      })
      .addCase(viewProfile.rejected, (state, action) => {
        state.viewProfile.data = null;
        state.viewProfile.isError = true;
        state.viewProfile.isLoading = false;
        state.viewProfile.message = action.payload.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updateProfile.data = null;
        state.updateProfile.message = '';
        state.updateProfile.isError = false;
        state.updateProfile.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfile.isLoading = false;
        state.updateProfile.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateProfile.data = null;
        state.updateProfile.isError = true;
        state.updateProfile.isLoading = false;
        state.updateProfile.message = action.payload.message;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.updateProfileImage.data = null;
        state.updateProfileImage.message = '';
        state.updateProfileImage.isError = false;
        state.updateProfileImage.isLoading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.updateProfileImage.isLoading = false;
        state.updateProfileImage.data = action.payload;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.updateProfileImage.data = null;
        state.updateProfileImage.isError = true;
        state.updateProfileImage.isLoading = false;
        state.updateProfileImage.message = action.payload.message;
      })
      .addCase(checkCurrentPassword.pending, (state) => {
        state.checkCurrentPassword.data = null;
        state.checkCurrentPassword.message = '';
        state.checkCurrentPassword.isError = false;
        state.checkCurrentPassword.isLoading = true;
      })
      .addCase(checkCurrentPassword.fulfilled, (state, action) => {
        state.checkCurrentPassword.isLoading = false;
        state.checkCurrentPassword.data = action.payload;
      })
      .addCase(checkCurrentPassword.rejected, (state, action) => {
        state.checkCurrentPassword.data = null;
        state.checkCurrentPassword.isError = true;
        state.checkCurrentPassword.isLoading = false;
        state.checkCurrentPassword.message = action.payload.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.changePassword.data = null;
        state.changePassword.message = '';
        state.changePassword.isError = false;
        state.changePassword.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePassword.isLoading = false;
        state.changePassword.data = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePassword.data = null;
        state.changePassword.isError = true;
        state.changePassword.isLoading = false;
        state.changePassword.message = action.payload.message;
      });
  }
});

export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
