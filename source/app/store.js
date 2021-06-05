import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from '../slices/authSlice';
import messReducer from '../slices/messSlice';

const rootReducer = {
  auth: authReducer,
  mess: messReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
