import { enqueueSnackbar } from 'notistack';
import coursesService from './courses.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  create: {
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
  update: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  newBatch: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  stopEnrollment: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

export const createCourse = createAsyncThunk(
  'course/create',
  async ({ payload, successCallback }, thunkAPI) => {
    try {
      const response = await coursesService.createCourse(payload);
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback();
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

export const viewAllCourses = createAsyncThunk(
  'course/viewAll',
  async ({ payload }, thunkAPI) => {
    try {
      const response = await coursesService.viewAllCourses(payload);
      if (response.data.success) {
        return {
          data: response.data.data,
          totalRecords: response.data.totalRecords
        };
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

export const courseDetails = createAsyncThunk(
  'course/details',
  async ({ courseId }, thunkAPI) => {
    try {
      const response = await coursesService.courseDetails(courseId);
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

export const updateCourse = createAsyncThunk(
  'course/update',
  async ({ payload, successCallback }, thunkAPI) => {
    try {
      const response = await coursesService.updateCourse(payload);
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback();
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

export const startNewBatch = createAsyncThunk(
  'course/newBatch',
  async ({ payload, successCallback }, thunkAPI) => {
    try {
      const response = await coursesService.startNewBatch(payload);
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback();
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

export const stopEnrollment = createAsyncThunk(
  'course/stopEnrollment',
  async ({ courseId, successCallback }, thunkAPI) => {
    try {
      const response = await coursesService.stopEnrollment(courseId);
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback && successCallback()
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

export const coursesSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    reset: (state) => {
      state.create = {
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
      state.update = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.newBatch = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.stopEnrollment = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    },
    // setCourseInfo: (state, action) => {
    //   state.courseData.information = action.payload;
    // },
    // setCourseContent: (state, action) => {
    //   state.courseData.content = action.payload;
    // },
    // setCoursePayment: (state, action) => {
    //   state.courseData.payment = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.create.data = null;
        state.create.message = '';
        state.create.isError = false;
        state.create.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.create.isLoading = false;
        state.create.data = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.create.data = null;
        state.create.isError = true;
        state.create.isLoading = false;
        state.create.message = action.payload.message;
      })
      .addCase(viewAllCourses.pending, (state) => {
        state.viewAll.data = null;
        state.viewAll.message = '';
        state.viewAll.isError = false;
        state.viewAll.isLoading = true;
      })
      .addCase(viewAllCourses.fulfilled, (state, action) => {
        state.viewAll.isLoading = false;
        state.viewAll.data = action.payload.data;
        state.viewAll.totalRecords = action.payload.totalRecords;
      })
      .addCase(viewAllCourses.rejected, (state, action) => {
        state.viewAll.data = null;
        state.viewAll.isError = true;
        state.viewAll.isLoading = false;
        state.viewAll.message = action.payload.message;
      })
      .addCase(courseDetails.pending, (state) => {
        state.details.data = null;
        state.details.message = '';
        state.details.isError = false;
        state.details.isLoading = true;
      })
      .addCase(courseDetails.fulfilled, (state, action) => {
        state.details.isLoading = false;
        state.details.data = action.payload;
      })
      .addCase(courseDetails.rejected, (state, action) => {
        state.details.data = null;
        state.details.isError = true;
        state.details.isLoading = false;
        state.details.message = action.payload.message;
      })
      .addCase(updateCourse.pending, (state) => {
        state.update.data = null;
        state.update.message = '';
        state.update.isError = false;
        state.update.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.update.isLoading = false;
        state.update.data = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.update.data = null;
        state.update.isError = true;
        state.update.isLoading = false;
        state.update.message = action.payload.message;
      })
      .addCase(startNewBatch.pending, (state) => {
        state.newBatch.data = null;
        state.newBatch.message = '';
        state.newBatch.isError = false;
        state.newBatch.isLoading = true;
      })
      .addCase(startNewBatch.fulfilled, (state, action) => {
        state.newBatch.isLoading = false;
        state.newBatch.data = action.payload;
      })
      .addCase(startNewBatch.rejected, (state, action) => {
        state.newBatch.data = null;
        state.newBatch.isError = true;
        state.newBatch.isLoading = false;
        state.newBatch.message = action.payload.message;
      })
      .addCase(stopEnrollment.pending, (state) => {
        state.stopEnrollment.data = null;
        state.stopEnrollment.message = '';
        state.stopEnrollment.isError = false;
        state.stopEnrollment.isLoading = true;
      })
      .addCase(stopEnrollment.fulfilled, (state, action) => {
        state.stopEnrollment.isLoading = false;
        state.stopEnrollment.data = action.payload;
      })
      .addCase(stopEnrollment.rejected, (state, action) => {
        state.stopEnrollment.data = null;
        state.stopEnrollment.isError = true;
        state.stopEnrollment.isLoading = false;
        state.stopEnrollment.message = action.payload.message;
      });
  }
});

export const { reset } = coursesSlice.actions;

export default coursesSlice.reducer;
