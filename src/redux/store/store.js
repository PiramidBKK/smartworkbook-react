import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";
import configReducer from "../slices/configSlice/configSlice";
import dvdesignReducer from "../slices/dvdesignSlice/dvdesignSlice";
import dvloginReducer from "../slices/dvloginSlice/dvloginSlice";
import swdetailReducer from "../slices/swdetailSlice/swdetailSlice";


const store = configureStore({
    reducer:{
        users: userReducer,
        configs: configReducer,
        dvdesigns : dvdesignReducer,
        dvlogin: dvloginReducer,
        swdetail: swdetailReducer,
    }
});

export default store;