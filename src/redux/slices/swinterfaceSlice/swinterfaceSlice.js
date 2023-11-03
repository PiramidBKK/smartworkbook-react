import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";

const initialState = {
    swinterfaces: [],
    swinterface : {},
    loading : false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create
export const createSwinterfaceAction = createAsyncThunk(
    'swinterface/addnew',
    async({connectto,description,vlanid,mode,label,remark, id, switchId},{rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 

            const formData = new FormData();
            formData.append("connectto", connectto);
            formData.append("description", description);
            formData.append("vlanid", vlanid);
            formData.append("mode", mode);
            formData.append("label", label);
            formData.append("remark", remark);

            const data = await axios.post(
                `${baseURL}/swinterface/addnew/${id}/${switchId}`,
                formData,
                tokenConfig,
            );

            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);  

        }
    }
)

//create
export const updateSwinterfaceAction = createAsyncThunk(
    'swinterface/update',
    async({connectto,description,vlanid,mode,label,remark, id, },{rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 


            const data = await axios.put(
                `${baseURL}/swinterface/${id}`,
                {connectto,description,vlanid,mode,label,remark},
                tokenConfig,
            );

            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);  

        }
    }
)

//fetch all
export const fetchSwInterfacesAction = createAsyncThunk(
    "swinterface/list",
    async({connectto,description,vlanid,mode,label,remark, id, switchId},{rejectWithValue, getState, dispatch}) =>{
        try{
            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 

            const data = await axios.get(
                `${baseURL}/swinterface`,
                tokenConfig
            )

            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data); 

        }
    }
)

//fetch single
export const fetchSwInterfaceAction = createAsyncThunk(
    "swinterface/details",
    async(id,{rejectWithValue, getState, dispatch}) =>{
        try{
            const token = getState()?.users?.userAuth?.userInfo?.data?.token;
            const tokenConfig = {
              headers: {
                Authorization: `Bearer ${token}`,

            },
            }; 

            const data = await axios.get(
                `${baseURL}/swinterface/${id}`,
                tokenConfig
            )

            return data;

        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data); 

        }
    }
)

const swinterfaceSlice = createSlice({
    name: "swinterfaces",
    initialState,
    extraReducers:(builder)=>{
    //create
    builder.addCase(createSwinterfaceAction.pending,(state)=>{
        state.loading = true;
    });

    builder.addCase(createSwinterfaceAction.fulfilled,(state, action)=>{
        state.loading = false;
        state.swinterface = action.payload;
        state.isAdded = true;

    });

    builder.addCase(createSwinterfaceAction.rejected, (state, action) => {
      state.loading = false;
      state.swinterface = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //update
    builder.addCase(updateSwinterfaceAction.pending,(state)=>{
        state.loading = true;
    });

    builder.addCase(updateSwinterfaceAction.fulfilled,(state, action)=>{
        state.loading = false;
        state.swinterface = action.payload;
        state.isUpdated = true;

    });

    builder.addCase(updateSwinterfaceAction.rejected, (state, action) => {
      state.loading = false;
      state.swinterface = null;
      state.isUpdated = false;
      state.error = action.payload;
    });

    //fetch all swinterfaces

    builder.addCase(fetchSwInterfacesAction.pending, (state)=>{
        state.loading = true;

    })

    builder.addCase(fetchSwInterfacesAction.fulfilled, (state, action)=>{
        state.loading = false;
        state.swinterfaces = action.payload;
        state.isAdded = true;

    })

    builder.addCase(fetchSwInterfacesAction.rejected, (state, action)=>{
        state.loading = false;
        state.swinterfaces = null;
        state.isAdded = false;
        state.error = action.payload;

    })

    //fetch single swinterfaces

    builder.addCase(fetchSwInterfaceAction.pending, (state)=>{
        state.loading = true;

    })

    builder.addCase(fetchSwInterfaceAction.fulfilled, (state, action)=>{
        state.loading = false;
        state.swinterface = action.payload;
        state.isAdded = true;

    })

    builder.addCase(fetchSwInterfaceAction.rejected, (state, action)=>{
        state.loading = false;
        state.swinterface = null;
        state.isAdded = false;
        state.error = action.payload;

    })

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

const swinterfaceReducer = swinterfaceSlice.reducer;

export default swinterfaceReducer;
