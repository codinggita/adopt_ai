import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campaignService from '../../services/campaignService.js';
import dataService from '../../services/dataService.js';

export const fetchCampaigns = createAsyncThunk(
  'campaign/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await campaignService.getCampaigns();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPlatformData = createAsyncThunk(
  'campaign/fetchPlatformData',
  async (_, thunkAPI) => {
    try {
      return await dataService.getCampaignMetrics();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createCampaign = createAsyncThunk(
  'campaign/create',
  async (campaignData, thunkAPI) => {
    try {
      return await campaignService.createCampaign(campaignData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  'campaign/update',
  async ({ id, campaignData }, thunkAPI) => {
    try {
      return await campaignService.updateCampaign(id, campaignData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaign/delete',
  async (id, thunkAPI) => {
    try {
      await campaignService.deleteCampaign(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    campaigns: [],
    platformData: [],
    loading: false,
    platformLoading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => { state.error = null; },
    importCampaigns: (state, action) => {
      // Temporary state management: prepend imported campaigns
      state.campaigns = [...action.payload, ...state.campaigns];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => { state.loading = true; })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.data;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPlatformData.pending, (state) => { state.platformLoading = true; })
      .addCase(fetchPlatformData.fulfilled, (state, action) => {
        state.platformLoading = false;
        state.platformData = action.payload.data;
      })
      .addCase(fetchPlatformData.rejected, (state, action) => {
        state.platformLoading = false;
        state.error = action.payload;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.campaigns.unshift(action.payload.data);
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        const idx = state.campaigns.findIndex(c => c._id === action.payload.data._id);
        if (idx !== -1) state.campaigns[idx] = action.payload.data;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.campaigns = state.campaigns.filter(c => c._id !== action.payload);
      });
  }
});

export const { resetError, importCampaigns } = campaignSlice.actions;
export default campaignSlice.reducer;
