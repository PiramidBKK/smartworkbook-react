import { useDispatch, useSelector } from 'react-redux'
import './SwdetailPopup.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSwDetailsAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import Swdetail from './Swdetail';

export default function SwdetailPopup(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchSwDetailsAction(id))
    });

    const {config, error, loading} = useSelector((state)=> state?.configs)
    const swdetailData = config?.data?.config?.swdetails;


    return (
      <div className="swdetail-popup-main">
        <h2>Switch Details</h2>
        <table>
          <thead>
            <th>Hostname</th>
            <th>Location</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Serialnumber</th>
            <th>Macaddress</th>
            <th>IP Address</th>
            <th>Subnetmask</th>
            <th>Default Gateway</th>
            <th>Ramark</th>
          </thead>
          <tbody>
            {swdetailData?.map((swdetail) => (
              <tr key={swdetail._id}>
                <td>{swdetail.hostname}</td>
                <td>{swdetail.location}</td>
                <td>{swdetail.brand}</td>
                <td>{swdetail.model}</td>
                <td>{swdetail.serialnumber}</td>
                <td>{swdetail.macaddress}</td>
                <td>{swdetail.ipaddress}</td>
                <td>{swdetail.subnetmask}</td>
                <td>{swdetail.defaultgateway}</td>
                <td>{swdetail.remark}</td>
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