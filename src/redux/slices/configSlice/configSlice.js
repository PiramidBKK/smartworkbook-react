import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

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

      console.log();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
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
  },
});

//generate the reducer
const configReducer = configSlice.reducer;

export default configReducer;
