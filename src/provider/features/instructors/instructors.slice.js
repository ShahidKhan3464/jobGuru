// Importing enqueueSnackbar from notistack and instructorService for API calls
import { enqueueSnackbar } from 'notistack';
import instructorService from './instructors.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Initial state for the instructor slice
const initialState = {
  add: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  viewAll: {
    data: null,
    message: '',
    isError: false,
    totalRecords: 0,
    isLoading: false
  },
  details: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  delete: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

// Async thunk for adding a new instructor
export const addInstructor = createAsyncThunk(
  'instructor/add',
  async ({ formData }, thunkAPI) => {
    try {
      const response = await instructorService.addInstructor(formData);
      if (response.data.success) {
        // Show success snackbar if the request is successful
        enqueueSnackbar('Invite Sent Successfully', { variant: 'success' });
        return response.data;
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

// Async thunk for viewing all instructors
export const viewAllInstructor = createAsyncThunk(
  'instructor/viewAll',
  async ({ payload }, thunkAPI) => {
    try {
      const response = await instructorService.viewAllInstructor(payload);
      if (response.data.success) {
        return {
          data: response.data.data,
          totalRecords: response.data.totalRecords
        };
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

// Async thunk for retrieving details of a specific instructor
export const instructorDetails = createAsyncThunk(
  'instructor/details',
  async ({ id }, thunkAPI) => {
    try {
      const response = await instructorService.instructorDetails(id);
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

// Async thunk for deleting an instructor
export const deleteInstructor = createAsyncThunk(
  'instructor/delete',
  async ({ id }, thunkAPI) => {
    try {
      const response = await instructorService.deleteInstructor(id);
      if (response.data.success) {
        // Show success snackbar if the request is successful
        enqueueSnackbar('Instructor deleted successfully', {
          variant: 'success'
        });
        return response.data;
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

// Slice for the instructor-related actions and states
export const instructorsSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    // Resetting the instructor state to initial state
    reset: (state) => {
      state.add = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.viewAll = {
        data: null,
        message: '',
        isError: false,
        totalRecords: 0,
        isLoading: false
      };
      state.details = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.delete = {
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
      .addCase(addInstructor.pending, (state) => {
        state.add.data = null;
        state.add.message = '';
        state.add.isError = false;
        state.add.isLoading = true;
      })
      .addCase(addInstructor.fulfilled, (state, action) => {
        state.add.isLoading = false;
        state.add.data = action.payload;
      })
      .addCase(addInstructor.rejected, (state, action) => {
        state.add.data = null;
        state.add.isError = true;
        state.add.isLoading = false;
        state.add.message = action.payload.message;
      })
      .addCase(viewAllInstructor.pending, (state) => {
        state.viewAll.data = null;
        state.viewAll.message = '';
        state.viewAll.isError = false;
        state.viewAll.isLoading = true;
      })
      .addCase(viewAllInstructor.fulfilled, (state, action) => {
        state.viewAll.isLoading = false;
        state.viewAll.data = action.payload.data;
        state.viewAll.totalRecords = action.payload.totalRecords;
      })
      .addCase(viewAllInstructor.rejected, (state, action) => {
        state.viewAll.data = null;
        state.viewAll.isError = true;
        state.viewAll.isLoading = false;
        state.viewAll.message = action.payload.message;
      })
      .addCase(instructorDetails.pending, (state) => {
        state.details.data = null;
        state.details.message = '';
        state.details.isError = false;
        state.details.isLoading = true;
      })
      .addCase(instructorDetails.fulfilled, (state, action) => {
        state.details.isLoading = false;
        state.details.data = action.payload;
      })
      .addCase(instructorDetails.rejected, (state, action) => {
        state.details.data = null;
        state.details.isError = true;
        state.details.isLoading = false;
        state.details.message = action.payload.message;
      })
      .addCase(deleteInstructor.pending, (state) => {
        state.delete.data = null;
        state.delete.message = '';
        state.delete.isError = false;
        state.delete.isLoading = true;
      })
      .addCase(deleteInstructor.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.data = action.payload;
      })
      .addCase(deleteInstructor.rejected, (state, action) => {
        state.delete.data = null;
        state.delete.isError = true;
        state.delete.isLoading = false;
        state.delete.message = action.payload.message;
      });
  }
});

export const { reset } = instructorsSlice.actions;

export default instructorsSlice.reducer;
