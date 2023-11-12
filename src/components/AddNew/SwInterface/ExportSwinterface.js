import { useDispatch, useSelector } from 'react-redux'
import './SwitchInterface.css'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSwDetailAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import { fetchconfigsAction } from '../../../redux/slices/configSlice/configSlice';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";

export default function ExportSwinterface(){
    const dispatch = useDispatch();
    const {id, switchId} = useParams();



    useEffect(()=>{
      dispatch(fetchSwDetailAction(switchId))
    },[switchId, dispatch])
  
    const {swdetail} = useSelector((state)=> state?.swdetail);

    
    const swdetailData = swdetail?.data?.singleSwdetail;

    console.log(swdetailData);
    

    const swdetailName = swdetailData;
    const swinterfaceData = swdetailName ? swdetailName.swinterfaces : [];


    return (
      <div className="swinterface-popup-main">
        <h2>
          Switch Interface : {swdetailName ? swdetailName.hostname : null}
        </h2>
        <div className="image-of-switch">
          {swdetailName ? (
            <img
              src={swdetailName.modelimg}
              alt="Switch Image"
              className="switch-image"
            ></img>
          ) : null}
        </div>
        <div className="switchdetail-data">
          <div className="Hardware-detail">
            <table className="hardware">
              <thead>Hardware Detail</thead>
              <tbody>
                <tr>
                  <td>Product ID</td>
                  <td>{swdetailName?.model}</td>
                </tr>
                <tr>
                  <td>S/N</td>
                  <td>{swdetailName?.serialnumber}</td>
                </tr>
                <tr>
                  <td>MAC ADDRESS</td>
                  <td>{swdetailName?.macaddress}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="Configuration-detail">
            <table className="configuration">
              <thead className='sub-thead'>
                Configuration Detail
              </thead>
              <tbody>
                <tr>
                  <td>IP Address</td>
                  <td>{swdetailName?.ipaddress}</td>
                </tr>
                <tr>
                  <td>Hostname</td>
                  <td>{swdetailName?.hostname}</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>{swdetailName?.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <table>
          <thead>
            <th>Interface</th>
            <th>Connect to</th>
            <th>Description</th>
            <th>Vlan ID</th>
            <th>Mode</th>
            <th>Label</th>
            <th>Ramark</th>

          </thead>
          <tbody>
            {swinterfaceData?.map((swinterface) => (
              <tr key={swinterface._id}>
                <td>{swinterface.port}</td>
                <td>{swinterface.connectto}</td>
                <td>{swinterface.description}</td>
                <td>{swinterface.vlanid}</td>
                <td>{swinterface.mode}</td>
                <td>{swinterface.label}</td>
                <td>{swinterface.remark}</td>
          
            </tr>
            ))}
          </tbody>
        </table>

        <div className="popup-dvdesign-button">
          <Link to={`/wbdetail/${id}`} className="back-btn-dvdesign">
            <div className="back-dvdesign">
              <h3>Back</h3>
            </div>
          </Link>

          <Link
            to={`/swinterface/${id}/${switchId}`}
            className="ok-btn-dvdesign"
          >
            <div className="ok-dvdesign">
              <h3>OK</h3>
            </div>
          </Link>
        </div>
      </div>
    );


}