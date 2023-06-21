// import {createStore} from "redux";

// import rootReducer from "./reducers";
// const store=createStore(rootReducer); 
// export default store;



import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import couterReducer from './actions/index'

export default configureStore({
  reducer: {
    counter: couterReducer,
  },
})