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

export const createSwinterfaceAction = createAsyncThunk(
    'swinterface/addnew',
    async({connectto,description,vlanid,mode,label,remark, id, switchId},{rejectWithValue, getState, dispatch})=>{
        console.log(id, switchId);
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

const fetchSwInterfacesAction = createAsyncThunk(
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

    //fetch swinterfaces

    builder.addCase(fetchSwInterfacesAction.pending, (state)=>{
        state.loading = true;

    })

    builder.addCase(fetchSwInterfacesAction.fulfilled, (state, action)=>{
        state.loading = false;
        state.swinterface = action.payload;
        state.isAdded = true;

    })

    builder.addCase(fetchSwInterfacesAction.rejected, (state, action)=>{
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
