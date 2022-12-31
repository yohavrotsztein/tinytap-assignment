import { configureStore } from '@reduxjs/toolkit'
import photoReducer from './photos.js'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';


const store = configureStore({
  reducer: {
    photos: photoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

const { dispatch } = store;
const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();

export { store, dispatch, useDispatch, useSelector };
