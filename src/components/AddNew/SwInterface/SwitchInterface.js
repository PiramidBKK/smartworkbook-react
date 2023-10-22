import { useDispatch, useSelector } from 'react-redux'
import './SwitchInterface.css'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSwInterfacesAction } from '../../../redux/slices/swinterfaceSlice/swinterfaceSlice';
import { fetchSwDetailsAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import { fetchconfigsAction } from '../../../redux/slices/configSlice/configSlice';

export default function SwinterfacePopup(){
    const dispatch = useDispatch();
    const {id, switchId} = useParams();

    useEffect(()=>{
        dispatch(fetchconfigsAction(id))
        dispatch(fetchSwDetailsAction(id))
        dispatch(fetchSwInterfacesAction(switchId))
    },[id, switchId])

    const {config} = useSelector((state)=> state?.configs)
    
    const swdetailData = config?.data?.config?.swdetails;

    const swdetailName = swdetailData?.find((swdetail)=> swdetail._id === switchId)
    const swinterfaceData = swdetailName.swinterfaces;
    

    console.log(swdetailName.swinterfaces);


    return (
      <div className="swinterface-popup-main">
        <h2>Switch Interface : {swdetailName ? swdetailName.hostname : null}</h2>
        <div className='image-of-switch'>

        </div>
        <div className="switchdetail-data">
          <div className="Hardware-detail">
            <table>

            </table>
          </div>

          <div className="Configuration-detail">
            <table>

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
            {swinterfaceData?.map((swinterface) =>(
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
    

        <Link to={`/wbdetail/${id}`} className="back-btn-dvdesign">
          <div className="back-dvdesign">
            <h3>Back</h3>
          </div>
        </Link>
      </div>
    );


}