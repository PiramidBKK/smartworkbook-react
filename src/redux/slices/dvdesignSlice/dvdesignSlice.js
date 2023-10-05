import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState ={
    loading : false,
    error: null,
    dvdesigns: [],
    dvdesign : {},
    isAdded: false,
    isUpdated: false,
    isDeleted: false,

};

//create dvdesign
export const createDvdesignAction = createAsyncThunk(
    'dvdesign/addnew',
    async(payload, {rejectWithValue, getState, dispatch}) =>{
        try{
            const {    
                vlanid,
                vlanname,
                subnet,
                ip,
                gateway,
                hostrange,
                remark
            } = payload;

            const token = getState()?.user?.useAuth?.userInfo?.data?.token
            const tokenConfig = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }

            formData.append("vlanid", vlanid);
            formData.append("vlanname", vlanname);
            formData.append("subnet", subnet);
            formData.append("ip", ip);
            formData.append("gateway", gateway);
            formData.append("hostrange", hostrange);
            formData.append("remark", remark);

            //make request
            const data = await axios.post(
                `${baseURL}/dvdesign/addnew`,
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
//Fetch all dvdesign
export const fetchDvdesignsAction = createAsyncThunk(
    'dvdesign/list',
    async(payload, {rejectWithValue, getState, dispatch}) =>{
        try{

            const token = getState()?.user?.useAuth?.userInfo?.data?.token
            const tokenConfig = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }

            //make request
            const data = await axios.get(
                `${baseURL}/dvdesign`,
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

const dvdesignSlice = createSlice({
    name: "dvdesigns",
    initialState,
    extraReducers:(builder) =>{
        
        //create
        
        builder.addCase(createDvdesignAction.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(createDvdesignAction.fulfilled, (state) =>{
            state.loading = false;
            state.dvdesign = action.payload;
            state.isAdded = true;
        });

        builder.addCase(createDvdesignAction.rejected, (state) =>{
            state.loading = false;
            state.dvdesign = null
            state.isAdded = false;
            state.error = action.payload;

        });

        //fetch dvdesign
        
        builder.addCase(fetchDvdesignsAction.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(fetchDvdesignsAction.fulfilled, (state) =>{
            state.loading = false;
            state.dvdesign = action.payload;
            state.isAdded = true;
        });

        builder.addCase(fetchDvdesignsAction.rejected, (state) =>{
            state.loading = false;
            state.dvdesign = null
            state.isAdded = false;
            state.error = action.payload;

        });

    }
})

export default dvdesignSlice;