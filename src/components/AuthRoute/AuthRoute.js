import React from "react";
import Login from '../Authen/Login';

const AuthRoute = ({children}) =>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const isLoggedIn = user?.data?.token ? true : false;

    if(!isLoggedIn) return <Login />
    return<>{children}</>;

}

export default AuthRoute;