import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";
import configReducer from "../slices/configSlice/configSlice";
import dvdesignReducer from "../slices/dvdesignSlice/dvdesignSlice";


const store = configureStore({
    reducer:{
        users: userReducer,
        configs: configReducer,
        dvdesigns : dvdesignReducer
    }
});

export default store;