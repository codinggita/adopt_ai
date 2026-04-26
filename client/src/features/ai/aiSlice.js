import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import aiService from '../../services/aiService.js';

const initialState = {
  insights: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Generate new insights
export const generateInsights = createAsyncThunk(
  'ai/generate',
  async (campaignId, thunkAPI) => {
    try {
      return await aiService.generateInsights(campaignId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user insights
export const getInsights = createAsyncThunk(
  'ai/getAll',
  async (_, thunkAPI) => {
    try {
      return await aiService.getInsights();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Dismiss/Delete an insight
export const dismissInsight = createAsyncThunk(
  'ai/delete',
  async (id, thunkAPI) => {
    try {
      await aiService.deleteInsight(id);
      return id; // Return the ID so we can remove it from state
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    // Optimistic local update for applying an insight (since we don't have a backend apply route yet)
    applyInsightLocal: (state, action) => {
      state.insights = state.insights.filter(
        (insight) => insight._id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // Generate Insights
      .addCase(generateInsights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateInsights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // The API returns { status: 'success', data: { ...insight } }
        // We prepend the new insight to the list
        if (action.payload.data) {
           state.insights.unshift(action.payload.data);
        }
      })
      .addCase(generateInsights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Insights
      .addCase(getInsights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInsights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // The API returns { status: 'success', data: [...] }
        state.insights = action.payload.data || [];
      })
      .addCase(getInsights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Dismiss Insight
      .addCase(dismissInsight.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dismissInsight.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insights = state.insights.filter(
          (insight) => insight._id !== action.payload
        );
      })
      .addCase(dismissInsight.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, applyInsightLocal } = aiSlice.actions;
export default aiSlice.reducer;
