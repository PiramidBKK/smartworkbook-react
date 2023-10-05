import { Link } from 'react-router-dom';
import './DvDesign.css'
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent';

export default function DvDesign  (){
  //dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    vlanid: "",
    vlanname: "",
    subnet: "",
    ip: "",
    gateway: "",
    hostrange: "",
    remark: "",
  });

  const {loading} = Selection

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    vlanid,
    vlanname,
    subnet,
    ip,
    gateway,
    hostrange,
    remark
  } = formData

  const onSubmitHandler = (e) => {
    e.preventDefault();

  }



  return (
    <div className="AddDvDesignPage">
      <h1>ADD Vlan</h1>

      <div className="Preview">
        <button className="preview-btn">Preview</button>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="st-form">
          <div className="vlanid-form">
            <label>Vlan ID</label>
            <input
              onChange={onChangeHandler}
              name="vlanid"
              value={vlanid}
            ></input>
          </div>

          <div className="vlanname-form">
            <label>Vlan Name</label>
            <input
              onChange={onChangeHandler}
              name="vlanname"
              value={vlanname}
            ></input>
          </div>
        </div>

        <div className="nd-form">
          <div className="ip-form">
            <label>IP Address</label>
            <input onChange={onChangeHandler} name="ip" value={ip}></input>
          </div>

          <div className="subnet-form">
            <label>Subnet</label>
            <input
              onChange={onChangeHandler}
              name="subnet"
              value={subnet}
            ></input>
          </div>
        </div>

        <div className="gateway-form">
          <label>Gateway</label>
          <input
            onChange={onChangeHandler}
            name="gateway"
            value={gateway}
          ></input>
        </div>

        <div className="rd-form">
          <div className="hostrange-form">
            <label>Host Range</label>
            <input
              onChange={onChangeHandler}
              name="hostrange"
              value={hostrange}
            ></input>
          </div>

          <div className="remark-form">
            <label>Remark</label>
            <input
              onChange={onChangeHandler}
              name="remark"
              value={remark}
            ></input>
          </div>
        </div>

        <div className="dvdesign-button">
          <Link to="/" className="back-btn">
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
      </form>
    </div>
  );
}

