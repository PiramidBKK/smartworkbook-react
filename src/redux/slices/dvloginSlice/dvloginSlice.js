import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";


const initialState ={
    dvlogins: [],
    dvlogin : {},
    loading : false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,

};


export const createDvloginAction = createAsyncThunk(
    'dvlogin/addnew',
    async({devicename,dvusername,dvpassword,remark, id}, {rejectWithValue, getState, dispatch}) =>{
        try{

            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 

            const formData = new FormData();
            formData.append("devicename",devicename);
            formData.append("dvusername",dvusername);
            formData.append("dvpassword",dvpassword);
            formData.append("remark",remark);

            const data = await axios.post(
                `${baseURL}/dvlogin/addnew/${id}`,
                formData,
                tokenConfig
            );

            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetched all dvlogin
export const fetchDvloginsAction = createAsyncThunk(
    'dvlogin/list',
    async({devicename,dvusername,dvpassword,remark, id}, {rejectWithValue, getState, dispatch}) =>{
        try{
            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 

                        //make request
            const data = await axios.get(
                `${baseURL}/dvlogin`,
                tokenConfig

            );
            
            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
)

//fetch single dvlogin
export const fetchSingleDvdesignsAction = createAsyncThunk(
    'dvlogin/details',
    async(dvloginId, {rejectWithValue, getState, dispatch}) =>{
        try{

            const token = getState()?.user?.useAuth?.userInfo?.data?.token
            const tokenConfig = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }

            //make request
            const data = await axios.get(
                `${baseURL}/dvlogin/${dvloginId}`,
                tokenConfig

            );

            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

const dvloginsSlice = createSlice({
    name: "dvlogins",
    initialState,
    extraReducers:(builder) =>{
        //create
        builder.addCase(createDvloginAction.pending, (state) => {
          state.loading = true;
        });

        builder.addCase(createDvloginAction.fulfilled, (state, action) => {
          state.loading = false;
          state.dvlogin = action.payload;
          state.isAdded = true;
        });

        builder.addCase(createDvloginAction.rejected, (state, action) => {
          state.loading = false;
          state.dvlogin = null;
          state.isAdded = false;
          state.error = action.payload;
        });

        //fetch dvlogin
        builder.addCase(fetchDvloginsAction.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(fetchDvloginsAction.fulfilled, (state, action) =>{
            state.loading = false;
            state.dvlogins = action.payload;
            state.isAdded = true;
        });

        builder.addCase(fetchDvloginsAction.rejected, (state, action) =>{
            state.loading = false;
            state.dvlogins = null
            state.isAdded = false;
            state.error = action.payload;

        });

        //reset err
        builder.addCase(resetErrAction.pending, (state) => {
          state.error = null;
        });

        //reset success
        builder.addCase(resetSuccessAction.pending, (state) => {
          state.isAdded = false;
        });

    }
})

const dvloginReducer = dvloginsSlice.reducer

export default dvloginReducer;