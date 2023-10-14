import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


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


const dvloginSlice = createSlice({
    name: "dvlogin",
    initialState,
    extraReducers:(builder) =>{
        //create
        builder.addCase(createDvloginAction.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(createDvloginAction.fulfilled, (state, action) =>{
            state.loading = false;
            state.dvlogin = action.payload;
            state.isAdded = true;
        });

        builder.addCase(createDvloginAction.rejected, (state, action) =>{
            state.loading = false;
            state.dvlogin = null;
            state.isAdded = false;
            state.error = action.payload;
        })

    }
})

const dvloginReducer = dvloginSlice.reducer

export default dvloginReducer;