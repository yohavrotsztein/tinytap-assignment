
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  // photos: [
  //   "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg",
  //   "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_2.jpg",
  //   "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_3.jpg",
  //   "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_4.jpg",
  //   "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_5.jpg",
  //   "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_6.jpg",
  //   "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_7.jpg",
  // ],
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
      state.photos.unshift(action.payload)
    },

    // UPDATE PHOTO 
    updatePhoto(state, action) {
      const updatePhotos =  state.photos.map(photo => photo.login.uuid !== action.payload.login.uuid ? photo : action.payload);
      state.photos = updatePhotos;
    }
  }
});

// ----------------------------------------------------------------------


export default photoReducer.reducer

// Actions
export const {
  deletePhoto,
  addPhoto,
  updatePhoto
} = photoReducer.actions;
