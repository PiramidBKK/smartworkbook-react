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

