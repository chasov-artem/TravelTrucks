import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      if (!Array.isArray(state.favorites)) {
        state.favorites = [];
      }

      const index = state.favorites.findIndex(
        (camper) => camper.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavorites = createSelector(
  (state) => state.favorites.favorites,
  (favorites) => {
    if (Array.isArray(favorites)) {
      return [...favorites];
    }
    console.error("Favorites state is not an array:", favorites);
    return [];
  }
);

export default favoritesSlice.reducer;
