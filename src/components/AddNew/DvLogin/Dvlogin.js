import { Link, useParams } from 'react-router-dom';
import './Dvlogin.css'
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent';

export default function DvLogin (){

  const {id} = useParams();

  const [formData, setFormData] = useState({
    devicename: "",
    dvusername: "",
    dvpassword: "",
    remark: ""
  })

  const {
    devicename,
    dvusername,
    dvpassword,
    remark
  } = formData

  const {loading} = Selection

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const onSubmitHandler = (e) =>{
      e.preventDefault();

    }

    return (
      <div className="AddDvLoginPage">
        <h1>User Login</h1>
        <div className="Preview">
          <button className="preview-btn">Preview</button>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className='main-form'>
          <div className="st-form">
            <div className="dvusername-form">
              <label>Username</label>
              <input
                onChange={onChangeHandler}
                name="dvusername"
                value={dvusername}
              ></input>
            </div>

            <div className="dvpassword-form">
              <label>Password</label>
              <input
                onChange={onChangeHandler}
                name="dvpassword"
                value={dvpassword}
              ></input>
            </div>
          </div>

          <div className="nd-form">
            <div className="devicename-form">
              <label>Devicename</label>
              <input
                onChange={onChangeHandler}
                name="devicename"
                value={devicename}
              ></input>
            </div>

            <div className="login-remark-form">
              <label>Remark</label>
              <input
                onChange={onChangeHandler}
                name="remark"
                value={remark}
              ></input>
            </div>
          </div>

          <div className="dvdesign-button">
            <Link to={`/wbdetail/${id}`} className="back-btn">
              <div className="back">
                {loading ? <LoadingComponent /> : <h3>Back</h3>}
              </div>
            </Link>

            <button className="next-btn">
              <div className="next">
                {loading ? <LoadingComponent /> : <h3>Next</h3>}
              </div>
            </button>
          </div>
          </div>
        </form>
      </div>
    );

}

