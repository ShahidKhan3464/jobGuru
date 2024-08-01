import { enqueueSnackbar } from 'notistack';
import fileUploadService from './fileUpload.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseThumbnail: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  lectureMaterials: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

export const courseThumbnail = createAsyncThunk(
  'file/courseThumbnail',
  async ({ formData, successCallback }, thunkAPI) => {
    try {
      const response = await fileUploadService.singleFileUpload(formData);
      if (response.data.success) {
        successCallback && successCallback();
        enqueueSnackbar('File uploaded successfully', { variant: 'success' });
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

export const lectureMaterial = createAsyncThunk(
  'file/lectureMaterials',
  async ({ formData, successCallback }, thunkAPI) => {
    try {
      const response = await fileUploadService.singleFileUpload(formData);
      if (response.data.success) {
        successCallback && successCallback(response.data.data);
        enqueueSnackbar('File uploaded successfully', { variant: 'success' });
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

export const lectureMaterials = createAsyncThunk(
  'file/lectureMaterials',
  async ({ formData, successCallback }, thunkAPI) => {
    try {
      const response = await fileUploadService.multipleFileUpload(formData);
      if (response.data.success) {
        successCallback && successCallback(response.data.data);
        enqueueSnackbar('Files uploaded successfully', { variant: 'success' });
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

export const fileUploadSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    reset: (state) => {
      state.courseThumbnail = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.lectureMaterials = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(courseThumbnail.pending, (state) => {
        state.courseThumbnail.data = null;
        state.courseThumbnail.message = '';
        state.courseThumbnail.isError = false;
        state.courseThumbnail.isLoading = true;
      })
      .addCase(courseThumbnail.fulfilled, (state, action) => {
        state.courseThumbnail.isLoading = false;
        state.courseThumbnail.data = action.payload;
      })
      .addCase(courseThumbnail.rejected, (state, action) => {
        state.courseThumbnail.data = null;
        state.courseThumbnail.isError = true;
        state.courseThumbnail.isLoading = false;
        state.courseThumbnail.message = action.payload.message;
      })

      .addCase(lectureMaterials.pending, (state) => {
        state.lectureMaterials.data = null;
        state.lectureMaterials.message = '';
        state.lectureMaterials.isError = false;
        state.lectureMaterials.isLoading = true;
      })
      .addCase(lectureMaterials.fulfilled, (state, action) => {
        state.lectureMaterials.isLoading = false;
        state.lectureMaterials.data = action.payload;
      })
      .addCase(lectureMaterials.rejected, (state, action) => {
        state.lectureMaterials.data = null;
        state.lectureMaterials.isError = true;
        state.lectureMaterials.isLoading = false;
        state.lectureMaterials.message = action.payload.message;
      });
  }
});

export const { reset } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
