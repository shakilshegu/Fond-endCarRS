import { configureStore } from "@reduxjs/toolkit" 
import { combineReducers } from "redux"
import { alertsSlice } from "./alertsSlice"
import userSlice from "./userSlice";

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
})


const store = configureStore({
    reducer: rootReducer,
    user:userSlice
})

export default store