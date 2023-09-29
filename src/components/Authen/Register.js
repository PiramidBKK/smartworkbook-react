import react, { useState, useEffect } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';
import { registerUserAction } from '../../redux/slices/users/userSlice';
import { useDispatch , useSelector} from 'react-redux';
import LoadingComponent from '../LoadingComp/LoadingComponent';


const Register = () =>{

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
        dispatch(registerUserAction({username, password}))
        
      }

      const { user, error, loading } = useSelector((state) => state?.users);

 
        useEffect(() => {
          if (user?.data) {
            window.location.href = "/login";
          }
        }, [user]);

    return (
      <div>
        <div className="RegisterBox">
          <h1>Register</h1>
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


                  <div className="register-button">
                    {loading ? (<LoadingComponent />): (
                      <button className='formbtn'>Register</button>

                    )}
                  </div>
                  
                <div className='Link'>
                <div className="login">
                    Have account?<span> </span>
                    <Link to="/login" className='underLogin'>Login</Link>
                  </div>
                  

                </div>

              </form>
        </div>
      </div>
    );
}


export default Register;