import { Link, useParams } from 'react-router-dom';
import './DvDesign.css'
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent'
import { createDvdesignAction, fetchDvdesignsAction } from '../../../redux/slices/dvdesignSlice/dvdesignSlice';
import Popup from 'reactjs-popup';



export default function DvDesign  (){

  const {id} = useParams();

  //dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    vlanid: "",
    vlanname: "",
    ipsubnet: "",
    gateway: "",
    hostrange: "",
    remark: "",

  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const {
  //   vlanid,
  //   vlanname,
  //   ipsubnet,
  //   gateway,
  //   hostrange,
  //   remark,
    
  // } = formData

  const { dvdesigns ,isAdded, loading, error } = useSelector((state) => state?.dvdesigns);


  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createDvdesignAction(
      { 
        ...formData,
        id}
      ))
    }

  


  return (
    <div className="AddDvDesignPage">
      <h1>ADD Vlan</h1>


        <div className="Preview">
          <Link to={`/dvdesign-popup/${id}`}>
            <button className="preview-btn">Preview</button>
          </Link>
        </div>


      <form onSubmit={onSubmitHandler}>
      <div className='errormsg'>{error && <p className='displayError-add-data'>{error?.message}</p>}</div>

        <div className="main-form">
          <div className="st-form">
            <div className="vlanid-form">
              <label>Vlan ID</label>
              <input
                onChange={onChangeHandler}
                name="vlanid"
                value={formData.vlanid}
              ></input>
            </div>

            <div className="vlanname-form">
              <label>Vlan Name</label>
              <input
                onChange={onChangeHandler}
                name="vlanname"
                value={formData.vlanname}
              ></input>
            </div>
          </div>

          <div className="nd-form">
            <div className="ipsubnet-form">
              <label>IP/Subnet</label>
              <input
                onChange={onChangeHandler}
                name="ipsubnet"
                value={formData.ipsubnet}
              ></input>
            </div>

            <div className="gateway-form">
              <label>Gateway</label>
              <input
                onChange={onChangeHandler}
                name="gateway"
                value={formData.gateway}
              ></input>
            </div>
          </div>

          <div className="rd-form">
            <div className="hostrange-form">
              <label>Host Range</label>
              <input
                onChange={onChangeHandler}
                name="hostrange"
                value={formData.hostrange}
              ></input>
            </div>

            <div className="remark-form">
              <label>Remark</label>
              <input
                onChange={onChangeHandler}
                name="remark"
                value={formData.remark}
              ></input>
            </div>
          </div>

          <div className="dvdesign-button">
            <Link to={`/wbdetail/${id}`}  className="back-btn">
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

