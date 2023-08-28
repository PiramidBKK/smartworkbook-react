
import { Link } from 'react-router-dom';
import './Login.css'
import React, { useState } from "react";


const Login = () =>{

    //dispatch
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const {username, password} = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


    //display page
    return (
      <body>
          <div className="LoginBox">
              <h1>Login</h1>
              <form>
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


                  <div className="button">
                    <button>Login</button>
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
      </body>
    );
}

export default Login;