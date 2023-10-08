import { Link } from 'react-router-dom';
import './Swdetail.css'
import React, { useEffect,useState } from "react";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import Select from 'react-select';

const animetedComponents = makeAnimated();


export default function Swdetail (){

  const [formData, setFormData] = useState({
    hostname: "", 
    location: "", 
    brand: "", 
    model: "", 
    serialnumber: "", 
    macaddress: "",  
    ipaddress: "", 
    subnetmask: "",
    defaultgateway: "", 
    remark: "" 
  })

  const {
    hostname, 
    location , 
    brand , 
    model , 
    serialnumber, 
    macaddress ,  
    ipaddress, 
    subnetmask,
    defaultgateway, 
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
      <div className="AddSwDetailPage">
        <h1>Switch Details</h1>

        <div className="Preview">
          <button className="preview-btn">Preview</button>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className='main-form'>
          <div className="st-form">
            <div className="hostname-form">
              <label>Hostname</label>
              <input
                onChange={onChangeHandler}
                name="hostname"
                value={hostname}
              ></input>
            </div>

            <div className="location-form">
              <label>Location</label>
              <input
                onChange={onChangeHandler}
                name="location"
                value={location}
              ></input>
            </div>
          </div>

          <div className="nd-form">
            <div className="brand-form">
              <label>Brand</label>
              <input
                onChange={onChangeHandler}
                name="brand"
                value={brand}
              ></input>
            </div>

            <div className="model-form">
              <label>Model</label>
              <input
                onChange={onChangeHandler}
                name="model"
                value={model}
              ></input>
            </div>
          </div>

          <div className="image-select">
            <label> Image</label>
            <Select
              components={animetedComponents}
              name="filetypes"
              className="selectImg"
              isSearchable={true}
              isLoading={false}
            />
          </div>

          <div className="rd-form">

          <div className="serialnumber-form">
              <label>Serialnumber</label>
              <input
                onChange={onChangeHandler}
                name="serialnumber"
                value={serialnumber}
              ></input>
            </div>

          <div className="macaddress-form">
              <label>Macaddress</label>
              <input
                onChange={onChangeHandler}
                name="macaddress"
                value={macaddress}
              ></input>
            </div>

          </div>

          <div className='fourth-form'>
          
          <div className="ipaddress-form">
              <label>IP Address</label>
              <input
                onChange={onChangeHandler}
                name="ipaddress"
                value={ipaddress}
              ></input>
            </div>
          
          <div className="subnetmask-form">
              <label>Subnetmask</label>
              <input
                onChange={onChangeHandler}
                name="subnetmask"
                value={subnetmask}
              ></input>
            </div>

          </div>

          <div className='fifth-form'>
          
          <div className="defaultgateway-form">
              <label>Defaultgateway</label>
              <input
                onChange={onChangeHandler}
                name="defaultgateway"
                value={defaultgateway}
              ></input>
            </div>
          
          <div className="swdetail-remark-form">
              <label>Remark</label>
              <input
                onChange={onChangeHandler}
                name="remark"
                value={remark}
              ></input>
            </div>

          </div>

          <div className="swdetail-button">
          <Link to='/' className="back-btn-swdetail">
              <div className="back-swdetail">
                {loading ? <LoadingComponent /> : <h3>Back</h3>}
              </div>
            </Link>

            <button className="next-btn-swdetail">
              <div className="next-swdetail">
                {loading ? <LoadingComponent /> : <h3>Next</h3>}
              </div>
            </button>
          </div>
          </div>
        </form>
        
      </div>
    );

}

