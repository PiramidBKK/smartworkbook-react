import { Link, useParams } from 'react-router-dom';
import './EditDvlogin.css'
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import { createDvloginAction, fetchDvloginAction, updateDvloginAction } from '../../../redux/slices/dvloginSlice/dvloginSlice';

export default function EditDvLogin (){

  const dispatch = useDispatch();

  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchDvloginAction(id))
  },[id, dispatch])

  const {dvlogin,isUpdated, error, loading} = useSelector((state) => state?.dvlogin)



  const [formData, setFormData] = useState({
    devicename: "",
    dvusername: "",
    dvpassword: "",
    remark: ""
  })

  useEffect(() => {
    if (dvlogin?.data?.getsingledvlogin) {
      setFormData({
        devicename: dvlogin?.data?.getsingledvlogin?.devicename,
        dvusername: dvlogin?.data?.getsingledvlogin?.dvusername,
        dvpassword: dvlogin?.data?.getsingledvlogin?.dvpassword,
        remark: dvlogin?.data?.getsingledvlogin?.remark
      });
    }
  }, [dvlogin]);


  const {
    devicename,
    dvusername,
    dvpassword,
    remark
  } = formData


    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };



    const onSubmitHandler = async (e) =>{
      e.preventDefault();
      await dispatch(updateDvloginAction({...formData ,id}))
      window.location.reload();

    }
    const configId = dvlogin?.data?.getsingledvlogin?.config;


    return (
      <div className="AddDvLoginPage">
        <h1>Edit User Login</h1>

        <div className="Preview">
          <Link to={`/dvlogin-popup/${configId}`}>
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
              <Link to={`/wbdetail/${configId}`} className="back-btn">
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

