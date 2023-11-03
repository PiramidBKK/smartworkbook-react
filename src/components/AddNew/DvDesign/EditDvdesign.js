import './EditDvdesign.css'

import { Link, useParams } from 'react-router-dom';
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent'
import { createDvdesignAction, fetchDvdesignAction, updateDvdesignAction } from '../../../redux/slices/dvdesignSlice/dvdesignSlice';
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';



export default function EditDvdesign  (){

  const {id} = useParams();


  //dispatch
  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchDvdesignAction(id))
    },[id, dispatch])

    const { dvdesign ,isUpdated, loading, error } = useSelector((state) => state?.dvdesigns);


  const [formData, setFormData] = useState({
    vlanid: dvdesign?.data?.dvdesign?.vlanid,
    vlanname: dvdesign?.data?.dvdesign?.vlanname,
    ipsubnet:  dvdesign?.data?.dvdesign?.ipsubnet,
    gateway:  dvdesign?.data?.dvdesign?.gateway,
    hostrange:  dvdesign?.data?.dvdesign?.hostrange,
    remark: dvdesign?.data?.dvdesign?.remark,

  });

  const configId = dvdesign?.data?.dvdesign?.config;


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



  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateDvdesignAction(
      { 
        ...formData,
        id}
      ))

    //   setFormData({
    //     vlanid: '',
    //     vlanname:'',
    //     ipsubnet: '',
    //     gateway: '',
    //     hostrange: '',
    //     remark: '',
    //   })
    }

  


  return (
    <div className="AddDvDesignPage">
      <h1>Edit Vlan</h1>
      {error && (
        <p className="displayError-add-data-dvdesign">{error?.message}</p>
      )}

        <div className="Preview">
          <Link to={`/dvdesign-popup/${configId}`}>
            <button className="preview-btn">Preview</button>
          </Link>
        </div>



      <form onSubmit={onSubmitHandler}>
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
            <Link to={`/wbdetail/${configId}`}  className="back-btn">
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

