import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    amenities: [],
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
  },
});

export const selectLocation = (state) => state.filters.location;
export const selectForm = (state) => state.filters.form;
export const selectAmenities = (state) => state.filters.amenities;
export const selectFilters = (state) => state.filters;

export const { setAmenities, setLocation, setForm } = filterSlice.actions;

export default filterSlice.reducer;
