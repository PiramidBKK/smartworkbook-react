import { useState } from 'react'
import './Swinterface.css'
import LoadingComponent from '../../LoadingComp/LoadingComponent'
import { Link, useParams } from 'react-router-dom'


export default function SwitchInterface (){

  const {id} = useParams();

    const [formData, setFormData] = useState({
        connectto : "",
        description: "",
        vlanid: "",
        mode: "",
        label: "",
        remark: ""
    })

    const {
        connectto,
        description,
        vlanid,
        mode,
        label,
        remark
    } = formData

    
  const {loading} = Selection

  const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const onSubmitHandler = (e) =>{
    e.preventDefault();

  }


    return(
        <div className="AddSwInterface">
        <h1>Switch Details</h1>
        <div className="Preview">
          <button className="preview-btn">Preview</button>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className='main-form'>
          <div className="st-form">
            
            </div>
  
            <div className="nd-form">
              <div className="description-form">
                <label>Description</label>
                <input
                  onChange={onChangeHandler}
                  name="description"
                  value={description}
                ></input>
              </div>
  
              <div className="connectto-form">
                <label>Connect to</label>
                <input
                  onChange={onChangeHandler}
                  name="connectto"
                  value={connectto}
                ></input>
              </div>
            </div>
  
            <div className="rd-form">
  
            <div className="vlanid-interface-form">
                <label>Vlan ID</label>
                <input
                  onChange={onChangeHandler}
                  name="vlanid"
                  value={vlanid}
                ></input>
              </div>
  
            <div className="mode-form">
                <label>Mode</label>
                <input
                  onChange={onChangeHandler}
                  name="mode"
                  value={mode}
                ></input>
              </div>
  
            </div>
  
            <div className='fourth-form'>
            
            <div className="label-form">
                <label>Label</label>
                <input
                  onChange={onChangeHandler}
                  name="label"
                  value={label}
                ></input>
              </div>
            
            <div className="remark-interface-form">
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
    )
}

