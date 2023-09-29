import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";
import configReducer from "../slices/configSlice/configSlice";


const store = configureStore({
    reducer:{
        users: userReducer,
        configs: configReducer
    }
});

export default store;