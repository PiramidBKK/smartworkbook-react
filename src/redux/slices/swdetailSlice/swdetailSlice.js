import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";

const initialState = {
    swdetails: [],
    swdetail : {},
    swinterfaces :{},
    loading : false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create switch detial
export const createSwDetailAction = createAsyncThunk(
    'swdetail/addnew',
    async(
        {hostname,location ,brand ,model, modelimg ,serialnumber,macaddress ,ipaddress ,subnetmask, defaultgateway,remark ,id}
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
                formData.append("modelimg",modelimg);
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

//create switch detial
export const updateSwdetailAction = createAsyncThunk(
    'swdetail/update',
    async(
        {hostname,location ,brand ,model, modelimg ,serialnumber,macaddress ,ipaddress ,subnetmask, defaultgateway,remark, id }
        ,{rejectWithValue, getState, dispatch}) =>{

            try{
                const token = getState()?.users?.userAuth?.userInfo?.data?.token;
                const tokenConfig = {
                  headers: {
                    Authorization: `Bearer ${token}`,
    
                },
                }; 


                const data = await axios.put(
                    `${baseURL}/swdetail/${id}`,
                    {hostname,location ,brand ,model, modelimg ,serialnumber,macaddress ,ipaddress ,subnetmask, defaultgateway,remark },
                    tokenConfig
                )

                return data;



            }catch(error){
                console.log(error);
                return rejectWithValue(error?.response?.data);  
            }
        }
);

//fetch all switch details

export const fetchSwDetailsAction = createAsyncThunk(
    'swdetail/list',
    async(
        payload 
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

//fetch single switch details

export const fetchSwDetailAction = createAsyncThunk(
    'swdetail/details',
    async(
         id,{rejectWithValue, getState, dispatch}) =>{
      console.log(id);
        try{
            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 

            const data = await axios.get(
                `${baseURL}/swdetail/${id}`,
                tokenConfig
            )

            return data;
        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);  
        }
    }
)

//Slices
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
            state.isUpdated = false;
            state.error = action.payload;
          });

        //update
        builder.addCase(updateSwdetailAction.pending, (state) => {
            state.loading = true;
          });
  
          builder.addCase(updateSwdetailAction.fulfilled, (state, action) => {
            state.loading = false;
            state.swdetail = action.payload;
            state.isUpdated = true;
          });
  
          builder.addCase(updateSwdetailAction.rejected, (state, action) => {
            state.loading = false;
            state.swdetail = null;
            state.isUpdated = false;
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

        //fetch swdetail
        builder.addCase(fetchSwDetailAction.pending, (state) => {
            state.loading = true;
          });
  
          builder.addCase(fetchSwDetailAction.fulfilled, (state, action) => {
            state.loading = false;
            state.swdetail = action.payload;
            // state.swinterfaces[action.payload.swdetail._id] = action.payload.swinterfaces;
            state.isAdded = true;
          });
  
          builder.addCase(fetchSwDetailAction.rejected, (state, action) => {
            state.loading = false;
            state.swdetail = null;
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