import { createAsyncThunk } from "@reduxjs/toolkit";

//reset error action 
export const resetErrAction = createAsyncThunk(
    'resetErrAction', () =>{
        return {
            
        };
    }
)


//reset successs action 
export const resetSuccessAction = createAsyncThunk(
    'resetErrAction', () =>{
        return {

        };
    }
)

