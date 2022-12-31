
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  photos:[]
};

const photoReducer = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // DELETE PHOTO 
    deletePhoto(state, action) {
      const updatePhotos = state.photos.filter((photo) => photo !== action.payload);
      state.photos = updatePhotos;
    },

    // ADD PHOTO 
    addPhoto(state, action) {
      state.photos.push(action.payload)
    },

  }
});

// ----------------------------------------------------------------------


export default photoReducer.reducer

// Actions
export const {
  deletePhoto,
  addPhoto,
} = photoReducer.actions;
