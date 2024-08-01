import { enqueueSnackbar } from 'notistack';
import dashboardService from './dashboard.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardCounter: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  recentEnrolledStudents: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  monthlyEnrolledStudents: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  lecturesSchedules: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

export const getDashboardSummary = createAsyncThunk(
  'dashboard/cardCounter',
  async (_, thunkAPI) => {
    try {
      const response = await dashboardService.getDashboardSummary();
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

export const viewRecentEnrolledStudents = createAsyncThunk(
  'dashboard/recentEnrolledStudents',
  async (_, thunkAPI) => {
    try {
      const response = await dashboardService.viewRecentEnrolledStudents();
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

export const viewMonthlyEnrolledStudents = createAsyncThunk(
  'dashboard/monthlyEnrolledStudents',
  async ({ year, successCallback }, thunkAPI) => {
    try {
      const response = await dashboardService.viewMonthlyEnrolledStudents(year);
      if (response.data.success) {
        successCallback && successCallback(response.data.data);
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

export const viewLecturesSchedules = createAsyncThunk(
  'dashboard/lecturesSchedules',
  async ({ date, successCallback }, thunkAPI) => {
    try {
      const response = await dashboardService.viewLecturesSchedules(date);
      if (response.data.success) {
        successCallback && successCallback(response.data.data);
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

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: (state) => {
      state.cardCounter = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.viewRecentEnrolled = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.monthlyEnrolledStudents = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.lecturesSchedules = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardSummary.pending, (state) => {
        state.cardCounter.data = null;
        state.cardCounter.message = '';
        state.cardCounter.isError = false;
        state.cardCounter.isLoading = true;
      })
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.cardCounter.isLoading = false;
        state.cardCounter.data = action.payload;
      })
      .addCase(getDashboardSummary.rejected, (state, action) => {
        state.cardCounter.data = null;
        state.cardCounter.isError = true;
        state.cardCounter.isLoading = false;
        state.cardCounter.message = action.payload?.message;
      })
      .addCase(viewRecentEnrolledStudents.pending, (state) => {
        state.recentEnrolledStudents.data = null;
        state.recentEnrolledStudents.message = '';
        state.recentEnrolledStudents.isError = false;
        state.recentEnrolledStudents.isLoading = true;
      })
      .addCase(viewRecentEnrolledStudents.fulfilled, (state, action) => {
        state.recentEnrolledStudents.isLoading = false;
        state.recentEnrolledStudents.data = action.payload;
      })
      .addCase(viewRecentEnrolledStudents.rejected, (state, action) => {
        state.recentEnrolledStudents.data = null;
        state.recentEnrolledStudents.isError = true;
        state.recentEnrolledStudents.isLoading = false;
        state.recentEnrolledStudents.message = action.payload.message;
      })
      .addCase(viewMonthlyEnrolledStudents.pending, (state) => {
        state.monthlyEnrolledStudents.data = null;
        state.monthlyEnrolledStudents.message = '';
        state.monthlyEnrolledStudents.isError = false;
        state.monthlyEnrolledStudents.isLoading = true;
      })
      .addCase(viewMonthlyEnrolledStudents.fulfilled, (state, action) => {
        state.monthlyEnrolledStudents.isLoading = false;
        state.monthlyEnrolledStudents.data = action.payload;
      })
      .addCase(viewMonthlyEnrolledStudents.rejected, (state, action) => {
        state.monthlyEnrolledStudents.data = null;
        state.monthlyEnrolledStudents.isError = true;
        state.monthlyEnrolledStudents.isLoading = false;
        state.monthlyEnrolledStudents.message = action.payload.message;
      })
      .addCase(viewLecturesSchedules.pending, (state) => {
        state.lecturesSchedules.data = null;
        state.lecturesSchedules.message = '';
        state.lecturesSchedules.isError = false;
        state.lecturesSchedules.isLoading = true;
      })
      .addCase(viewLecturesSchedules.fulfilled, (state, action) => {
        state.lecturesSchedules.isLoading = false;
        state.lecturesSchedules.data = action.payload;
      })
      .addCase(viewLecturesSchedules.rejected, (state, action) => {
        state.lecturesSchedules.data = null;
        state.lecturesSchedules.isError = true;
        state.lecturesSchedules.isLoading = false;
        state.lecturesSchedules.message = action.payload.message;
      });
  }
});

export const { reset } = dashboardSlice.actions;

export default dashboardSlice.reducer;
