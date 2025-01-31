import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCampers as fetchCampersService } from "../../services/services";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  fetchCampersService
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload.items)) {
          state.items = [...state.items, ...action.payload.items];
        } else {
          console.error("Unexpected API response format:", action.payload);
          state.items = [];
        }
        state.isLoading = false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectCampers = (state) => state.campers.items;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;

export default campersSlice.reducer;
