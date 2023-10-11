import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import baseURL from "../../../utils/baseURL";
import { resetErrAction } from "./globalActions/globalActions";


//intitial state

const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth:{
        loading: false,
        error: null,
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,

    }
};

//register action

export const registerUserAction = createAsyncThunk(
    'users/register',
    async ({username, password},
        {rejectWithValue, getState, dispatch}) => {
            try{
                //make http request
                const data = await axios.post(`${baseURL}/users/register`,
                    {
                    username,
                    password
                });
                return data;
            }catch(error){
                console.log(error);
                return rejectWithValue(error?.response?.data);
            }
        }
);



//login action
export const loginUserAction = createAsyncThunk(
    'users/login',
    async ({username, password}, 
            {rejectWithValue, getState, dispatch}) =>{
        try {
            //make the http request
            const data = await axios.post(`${baseURL}/users/login`, {
                username,
                password
            });
            //save user into local storage 
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
});

export const logoutAction = createAsyncThunk(
    "users/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      //get token
      localStorage.removeItem("userInfo");
      return true;
    }
  );

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) =>{
        //handle action
        //login
        builder.addCase(loginUserAction.pending, (state, action) =>{
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
            state.userAuth.error = false
        });
        builder.addCase(loginUserAction.rejected, (state, action) =>{
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;

        });

        //register
        builder.addCase(registerUserAction.pending, (state, action) =>{
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            
        });
        builder.addCase(registerUserAction.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;

        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state) =>{
            state.error = null;
        })
            //logout
        builder.addCase(logoutAction.fulfilled, (state, action) => {
        state.userAuth.userInfo = null;
         });
    },
})

const userReducer = userSlice.reducer;

export default userReducer;


