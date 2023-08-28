import react, { useState } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';


const Register = () =>{

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const {username, password} = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


    return (
      <body>
        <div className="RegisterBox">
          <h1>Register</h1>

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
                    <button>Register</button>
                  </div>
                  
                <div className='Link'>
                <div className="login">
                    Have account?<span> </span>
                    <Link to="/login" className='underLogin'>Login</Link>
                  </div>
                  

                </div>

              </form>
        </div>
      </body>
    );
}


export default Register;