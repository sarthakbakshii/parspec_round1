import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slice/SearchedDataSlice'

export default configureStore({
  reducer: {
    searchedData: counterReducer,
  },
});
