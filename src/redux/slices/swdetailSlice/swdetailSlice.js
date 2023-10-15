import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";

const initialState = {
    swdetails: [],
    swdetail : {},
    loading : false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

export const createSwDetailAction = createAsyncThunk(
    'swdetail/addnew',
    async(
        {hostname,location ,brand ,model ,serialnumber,macaddress ,ipaddress ,subnetmask, defaultgateway,remark ,id}
        ,{rejectWithValue, getState, dispatch}) =>{
            try{
                const token = getState()?.users?.userAuth?.userInfo?.data?.token;
                const tokenConfig = {
                  headers: {
                    Authorization: `Bearer ${token}`,
    
                },
                }; 

                const formData = new FormData();
                formData.append("hostname",hostname);
                formData.append("location",location);
                formData.append("brand",brand);
                formData.append("model",model);
                formData.append("serialnumber",serialnumber);
                formData.append("macaddress",macaddress);
                formData.append("ipaddress",ipaddress);
                formData.append("subnetmask",subnetmask);
                formData.append("defaultgateway",defaultgateway);
                formData.append("remark",remark);

                const data = await axios.post(
                    `${baseURL}/swdetail/addnew/${id}`,
                    formData,
                    tokenConfig
                )

                return data;


            }catch(error){
                console.log(error);
                return rejectWithValue(error?.response?.data);  
            }
        }
);

export const fetchSwDetailsAction = createAsyncThunk(
    'swdetail/list',
    async(
        {hostname,location ,brand ,model ,serialnumber,macaddress ,ipaddress ,subnetmask, defaultgateway,remark }
        ,{rejectWithValue, getState, dispatch}
    ) =>{
        try{
            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 

            const data = await axios.get(
                `${baseURL}/swdetail`,
                tokenConfig
            )

            return data;
        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);  
        }
    }
)


const swdetailsSlice = createSlice({
    name: "swdetails",
    initialState,
    extraReducers:(builder)=>{
        //create
        builder.addCase(createSwDetailAction.pending, (state) => {
            state.loading = true;
          });
  
          builder.addCase(createSwDetailAction.fulfilled, (state, action) => {
            state.loading = false;
            state.swdetail = action.payload;
            state.isAdded = true;
          });
  
          builder.addCase(createSwDetailAction.rejected, (state, action) => {
            state.loading = false;
            state.swdetail = null;
            state.isAdded = false;
            state.error = action.payload;
          });

        //fetch swdetails
        builder.addCase(fetchSwDetailsAction.pending, (state) => {
            state.loading = true;
          });
  
          builder.addCase(fetchSwDetailsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.swdetails = action.payload;
            state.isAdded = true;
          });
  
          builder.addCase(fetchSwDetailsAction.rejected, (state, action) => {
            state.loading = false;
            state.swdetails = null;
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

const swdetailReducer = swdetailsSlice.reducer;

export default swdetailReducer;