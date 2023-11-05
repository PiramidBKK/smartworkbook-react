import { useDispatch, useSelector } from 'react-redux'
import './SwitchInterface.css'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSwInterfacesAction } from '../../../redux/slices/swinterfaceSlice/swinterfaceSlice';
import { fetchSwDetailsAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import { fetchconfigsAction } from '../../../redux/slices/configSlice/configSlice';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";

export default function SwinterfacePopup(){
    const dispatch = useDispatch();
    const {id, switchId} = useParams();

    useEffect(()=>{
        dispatch(fetchconfigsAction(id))
        dispatch(fetchSwDetailsAction(id))
    },[id])

    const {config, error, loading} = useSelector((state)=> state?.configs)
    
    const swdetailData = config?.data?.config?.swdetails;

    const swdetailName = swdetailData?.find((swdetail)=> swdetail._id === switchId)
    const swinterfaceData = swdetailName ? swdetailName.swinterfaces : [];

    //switch images



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
            <th>Edit</th>
            <th>Delete</th>
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
                <td><Link to={`/edit-swinterface/${swinterface._id}`}><PencilSquareIcon className='pencil-edit'/></Link></td>
                <td>
                  <Link to={`/delete-swinterface/${swinterface._id}`}>
                    <TrashIcon className="delete-trash"  />
                  </Link>
              </td>              
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