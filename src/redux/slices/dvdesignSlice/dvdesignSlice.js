import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";
import { fetchSingleDvdesignsAction } from "../dvloginSlice/dvloginSlice";


const initialState ={
    dvdesigns: [],
    dvdesign : {},
    loading : false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,

};

//create dvdesign
export const createDvdesignAction = createAsyncThunk(
    'dvdesign/addnew',
    async( {
        vlanid,
        vlanname,
        ipsubnet,
        gateway,
        hostrange,
        remark, 
        id
    } ,{rejectWithValue, getState, dispatch}) =>{
        try{
            // const {     
            //     vlanid,
            //     vlanname,
            //     ipsubnet,
            //     gateway,
            //     hostrange,
            //     remark, } = payload;

            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            };

            const formData = new FormData();
            formData.append("vlanid", vlanid);
            formData.append("vlanname", vlanname);
            formData.append("ipsubnet", ipsubnet);
            formData.append("gateway", gateway);
            formData.append("hostrange", hostrange);
            formData.append("remark", remark);

            //make request
            const data = await axios.post(
                `${baseURL}/dvdesign/addnew/${id}`,
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

//update dvdesign
export const updateDvdesignAction = createAsyncThunk(
    'dvdesign/update',
    async( {
        vlanid,
        vlanname,
        ipsubnet,
        gateway,
        hostrange,
        remark, 
        id
    } ,{rejectWithValue, getState, dispatch}) =>{
        try{


          const token = getState()?.users?.userAuth?.userInfo?.data?.token;
          const tokenConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          //make request
          const data = await axios.put(
            `${baseURL}/dvdesign/${id}`,
            { vlanid, vlanname, ipsubnet, gateway, hostrange, remark },
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
                tokenConfig

            );

            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch single dvdesign
export const fetchDvdesignAction = createAsyncThunk(
    'dvdesign/details',
    async(id, {rejectWithValue, getState, dispatch}) =>{
        try{

            const token = getState()?.user?.useAuth?.userInfo?.data?.token
            const tokenConfig = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }

            //make request
            const data = await axios.get(
                `${baseURL}/dvdesign/${id}`,
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

        builder.addCase(createDvdesignAction.fulfilled, (state, action) =>{
            state.loading = false;
            state.dvdesign = action.payload;
            state.isAdded = true;
        });

        builder.addCase(createDvdesignAction.rejected, (state, action) =>{
            state.loading = false;
            state.dvdesign = null
            state.isAdded = false;
            state.error = action.payload;

        });

        //update   
        builder.addCase(updateDvdesignAction.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(updateDvdesignAction.fulfilled, (state, action) =>{
            state.loading = false;
            state.dvdesign = action.payload;
            state.isUpdated = true;
        });

        builder.addCase(updateDvdesignAction.rejected, (state, action) =>{
            state.loading = false;
            state.dvdesign = null
            state.isUpdated = false;
            state.error = action.payload;

        });

        //fetch dvdesigns

        builder.addCase(fetchDvdesignsAction.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(fetchDvdesignsAction.fulfilled, (state, action) =>{
            state.loading = false;
            state.dvdesigns = action.payload;
            state.isAdded = true;
        });

        builder.addCase(fetchDvdesignsAction.rejected, (state, action) =>{
            state.loading = false;
            state.dvdesigns = null
            state.isAdded = false;
            state.error = action.payload;

        });

        //fetch single dvdesigns
        
        builder.addCase(fetchDvdesignAction.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(fetchDvdesignAction.fulfilled, (state, action) =>{
            state.loading = false;
            state.dvdesign = action.payload;
            state.isAdded = true;
        });

        builder.addCase(fetchDvdesignAction.rejected, (state, action) =>{
            state.loading = false;
            state.dvdesign = null
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

const dvdesignReducer = dvdesignSlice.reducer


export default dvdesignReducer;