import { Link, useParams } from 'react-router-dom';
import './Swdetail.css'
import React, { useEffect,useState } from "react";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import { createSwDetailAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import Select from "react-select";
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';

const animetedComponents = makeAnimated();


export default function Swdetail (){
  const dispatch = useDispatch();

  const {id} = useParams();


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
    remark: "" ,
    
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
    remark ,
    
  } = formData

  const {swdetail, isAdded,loading, error} = useSelector((state)=> state?.swdetail)
  const {config} = useSelector((state)=> state?.configs);



  useEffect(()=>{
    dispatch(fetchconfigAction(id))
  },[id])

  //switch image
  const [selectSwitchImg, setSelectSwitchImg] = useState([])


  const handleImgChange = (selectImg) =>{
    
    setSelectSwitchImg(selectImg);


    setFormData((prevFormData) =>({
      ...prevFormData,
    }))


  }

  const imgLabel = config?.data?.config?.fileLabels.map((name)=>name)


  const imageOptionConverted = config?.data?.config?.images.map((url, index) => {
    return {
      value: url,
      label: imgLabel[index] || url, 
    };
    // const modelimg = imageOptionConverted[index].value;

  });

  let imageIndex = 0;


    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


    const onSubmitHandler = (e) =>{
      e.preventDefault();
      const modelimg = imageOptionConverted[imageIndex].value;
      dispatch(createSwDetailAction({
        ...formData,
        modelimg
        ,id}));
    }

    return (
      <div className="AddSwDetailPage">
        <h1>Switch Details</h1>

        <div className="Preview">
        <Link to={`/swdetail-popup/${id}`}>
            <button className="preview-btn">Preview</button>
          </Link>        </div>
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
              value={selectSwitchImg}
              onChange={handleImgChange}
              options={imageOptionConverted}
              isSearchable={true}
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
          <Link to={`/wbdetail/${id}`} className="back-btn-swdetail">
              <div className="back-swdetail">
                <h3>Back</h3>
              </div>
            </Link>



            {loading ? (
              <LoadingComponent />
            ) : (
              <button className="next-btn-swdetail" type="submit">
                <div className="next-swdetail">
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

