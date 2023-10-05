import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";

//initial state
const initialState = {
  configs: [],
  config: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create config action
export const createConfigAction = createAsyncThunk(
  "config/addnew",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const { projectname, locationname, filetypes, files } = payload;

      //TokenAuthen
      const token = getState()?.users?.userAuth?.userInfo?.data?.token;
      const tokenConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      //form Data
      const formData = new FormData();
      formData.append("projectname", projectname);
      formData.append("locationname", locationname);
      formData.append("filetypes", filetypes)

      files.forEach((file) => {
        formData?.append("files", file);
      });

      //make request
      const data = await axios.post(
        `${baseURL}/config/addnew`,
        formData,
        tokenConfig
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch All workbook
export const fetchconfigsAction = createAsyncThunk(
  'config/list',
  async(payload, {rejectWithValue, getState, dispatch}) =>{
    try{

      const token = getState()?.users?.userAuth?.userInfo?.data?.token;
      const tokenConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get(
        `${baseURL}/config`,tokenConfig
      )
      
        return data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error?.response?.data)
    }
  }
);

//Fetch Single workbook
export const fetchconfigAction = createAsyncThunk(
  'config/details',
  async(configId, {rejectWithValue, getState, dispatch}) =>{
    console.log(configId);
    try{

      const token = getState()?.users?.userAuth?.userInfo?.data?.token;
      const tokenConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get(
        `${baseURL}/config/${configId}`,tokenConfig
      )
      
        return data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error?.response?.data)
    }
  }
);

//create config slice
const configSlice = createSlice({
  name: "configs",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createConfigAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createConfigAction.fulfilled, (state, action) => {
      state.loading = false;
      state.config = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createConfigAction.rejected, (state, action) => {
      state.loading = false;
      state.config = null;
      state.isAdded = false;
      state.error = action.payload;
      
    });

    //fetch all
    builder.addCase(fetchconfigsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchconfigsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.configs = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchconfigsAction.rejected, (state, action) => {
      state.loading = false;
      state.configs = null;
      state.isAdded = false;
      state.error = action.payload;
      
    });

    //fetch one
    builder.addCase(fetchconfigAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchconfigAction.fulfilled, (state, action) => {
      state.loading = false;
      state.config = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchconfigAction.rejected, (state, action) => {
      state.loading = false;
      state.config = null;
      state.isAdded = false;
      state.error = action.payload;
      
    });

    builder.addCase(resetErrAction.pending, (state) =>{
      state.error = null
    });

    builder.addCase(resetSuccessAction.pending, (state) =>{
      state.isAdded = false

    });
  },
});

//generate the reducer
const configReducer = configSlice.reducer;

export default configReducer;
