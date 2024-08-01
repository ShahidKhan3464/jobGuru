import { enqueueSnackbar } from 'notistack';
import billingsService from './billings.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewAll: {
    data: null,
    message: '',
    isError: false,
    totalRecords: 0,
    isLoading: false
  }
};

export const viewAllBillings = createAsyncThunk(
  'billings/viewAll',
  async ({ payload }, thunkAPI) => {
    try {
      const response = await billingsService.viewAllBillings(payload);
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

export const billingsSlice = createSlice({
  name: 'billings',
  initialState,
  reducers: {
    reset: (state) => {
      state.viewAll = {
        data: null,
        message: '',
        isError: false,
        totalRecords: 0,
        isLoading: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewAllBillings.pending, (state) => {
        state.viewAll.data = null;
        state.viewAll.message = '';
        state.viewAll.isError = false;
        state.viewAll.isLoading = true;
      })
      .addCase(viewAllBillings.fulfilled, (state, action) => {
        state.viewAll.isLoading = false;
        state.viewAll.data = action.payload.data;
        state.viewAll.totalRecords = action.payload.totalRecords;
      })
      .addCase(viewAllBillings.rejected, (state, action) => {
        state.viewAll.data = null;
        state.viewAll.isError = true;
        state.viewAll.isLoading = false;
        state.viewAll.message = action.payload.message;
      });
  }
});

export const { reset } = billingsSlice.actions;

export default billingsSlice.reducer;
