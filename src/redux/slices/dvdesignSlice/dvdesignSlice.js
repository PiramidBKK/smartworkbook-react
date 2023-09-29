import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
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

export const createDvdesignAction = createAsyncThunk(
    'dvdesign/addnew',
    async(payload, {rejectWithValue, getState, dispatch}) =>{
        try{

        }catch(error){
            
        }
    }
)
