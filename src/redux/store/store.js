import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";
import configReducer from "../slices/configSlice/configSlice";
import dvdesignReducer from "../slices/dvdesignSlice/dvdesignSlice";
import dvloginReducer from "../slices/dvloginSlice/dvloginSlice";


const store = configureStore({
    reducer:{
        users: userReducer,
        configs: configReducer,
        dvdesigns : dvdesignReducer,
        dvlogin: dvloginReducer
    }
});

export default store;