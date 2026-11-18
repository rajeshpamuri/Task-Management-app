import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import TaskSlice from "./TaskSlice";
import SubmissionsSlice from "./SubmissionsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    task: TaskSlice,
    submission: SubmissionsSlice
});

const store = configureStore({
    reducer: rootReducer,
    // Redux Toolkit automatically includes thunk in getDefaultMiddleware, 
    // so we can omit the middleware property entirely here!
});

export default store;