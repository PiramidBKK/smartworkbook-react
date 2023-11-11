import { Link, useParams } from 'react-router-dom';
import './Dvlogin.css'
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import { createDvloginAction } from '../../../redux/slices/dvloginSlice/dvloginSlice';

export default function DvLogin (){

  const dispatch = useDispatch();

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

  const {dvlogin ,isAdded, loading, error } = useSelector((state) => state?.dvlogin)

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const onSubmitHandler = (e) =>{
      e.preventDefault();
      dispatch(createDvloginAction({...formData ,id}))

    }

    return (
      <div className="AddDvLoginPage">
        <h1>User Login</h1>

        <div className="Preview">
          <Link to={`/dvlogin-popup/${id}`}>
            <button className="preview-btn">Preview</button>
          </Link>
        </div>
        <form onSubmit={onSubmitHandler}>
        <div className='errormsg'>{error && <p className='displayError-add-data'>{error?.message}</p>}</div>

          <div className="main-form">
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
                  <h3>Back</h3>               
                </div>
              </Link>

              {loading ? (
              <LoadingComponent />
            ) : (
              <button className="next-btn" type="submit">
                <div className="next">
                  <h3>Next</h3>
                </div>
              </button>
            )}
            </div>
          </div>
        </form>
      </div>
    );

}

