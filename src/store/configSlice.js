import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  token: null,
  id: null,
  name: null,
  authMessage: false, // warning that you must be signed in to add cocktail etc.
  notification: null,
  modal: null,
  openSearchResults: false,
  openFavourites: false,
};

export const configSlice = createSlice({
  name: 'config',
  initialState: { value: initialState },
  reducers: {
    setLoading: (state, action) => {
      state.value.loading = action.payload;
    },
    setToken: (state, action) => {
      state.value.token = action.payload;
    },
    setId: (state, action) => {
      state.value.id = action.payload;
    },
    setNotification: (state, action) => {
      state.value.notification = action.payload;
    },
    setModal: (state, action) => {
      state.value.modal = action.payload;
    },
    setOpenSearchResults: (state, action) => {
      state.value.openSearchResults = action.payload;
    },
    setOpenFavourites: (state, action) => {
      state.value.openFavourites = action.payload;
    },
    toggleOpenFavourites: (state, action) => {
      state.value.openFavourites = !state.value.openFavourites;
    },
    setSearchQuery: (state, action) => {
      state.value.searchQuery = action.payload;
    },
  },
});

export default configSlice.actions;

export const configReducer = configSlice.reducer;
