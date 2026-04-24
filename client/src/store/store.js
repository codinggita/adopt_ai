import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import campaignReducer from '../features/campaign/campaignSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    campaign: campaignReducer,
  },
});

export default store;
