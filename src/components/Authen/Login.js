
import { Link } from 'react-router-dom';
import './Login.css'
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../redux/slices/users/userSlice';
import LoadingComponent from '../LoadingComp/LoadingComponent';


const Login = () =>{
    //dispatch
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const {username, password} = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const onSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(loginUserAction({username, password}));
    }

    //get data from store
    const {error, loading, userInfo} = useSelector(
      (state)=> state?.users?.userAuth)

      useEffect(() => {
        if (userInfo?.data?.userFound) {
          window.location.href = "/";
        }
      }, [userInfo]);

    //display page
    return (
      <div>
          <div className="LoginBox">
              <h1>Login</h1>
              {error && <p className='displayError'>{error?.message}</p>}
              <form onSubmit={onSubmitHandler}>
                <div className="Login">
                    <input name="username" value={username} onChange={onChangeHandler} type="text" />
                    <span ></span>
                    <label>Username</label>
                </div>
                <div className='PasswordBox'>
                <div className="Login">
                    <input name="password" value={password} onChange={onChangeHandler} type="password" />
                    <span ></span>
                    <label>Password</label>

                </div>
                </div>

                  <div className="login-button">
                    {loading ? (<LoadingComponent />) : (

                    <button className='formbtn'>Login</button>
                                      
                  )
                }
                  </div>


                <div className='Link'>
                <div className="register">
                    Not a member?<span> </span>
                    <Link to="/register" className='underRegister'>Register</Link>
                  </div>
                  
                  <div className="forgotpass">
                    Forgot password?<span> </span>
                    <Link to="/forgotpass" className='underForgot'>Click Here</Link>
                  </div>
                </div>

              </form>
            </div>
      </div>
    );
}

export default Login;