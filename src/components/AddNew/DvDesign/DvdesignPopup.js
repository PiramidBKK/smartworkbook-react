import { Link, useParams } from 'react-router-dom'
import './DvdesignPopup.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';



export default function DvdesignPopup(){
  const dispatch = useDispatch();


  const { id } = useParams();

  useEffect(()=>{
    dispatch(fetchconfigAction(id));
  },[id])

  const {config, error, loading} = useSelector((state)=> state?.configs)

  const dvdesignData = config?.data?.config?.dvdesigns;
  const configData = config?.data?.config
  



      return(
        <div className="dvdesign-popup-main">
        <h2>Vlan Design</h2>
        <table>
        <thead>
          <tr>
            <th>VLAN ID</th>
            <th>VLAN Name</th>
            <th>IP/Subnet</th>
            <th>Gateway</th>
            <th>Hostrange</th>
            <th>Ramark</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {dvdesignData?.map((dvdesign) => (
            <tr key={dvdesign._id}>
              <td>{dvdesign.vlanid}</td>
              <td>{dvdesign.vlanname}</td>
              <td>{dvdesign.ipsubnet}</td>
              <td>{dvdesign.gateway}</td>
              <td>{dvdesign.hostrange}</td>
              <td>{dvdesign.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='popup-dvdesign-button'>


      <Link to={`/wbdetail/${id}`}  className="back-btn-dvdesign">
              <div className="back-dvdesign">
                <h3>Back</h3>
              </div>
      </Link>

      <Link to={`/dvdesign/${id}`} className="ok-btn-dvdesign">
          <div className="ok-dvdesign">
            <h3>OK</h3>
          </div>
      </Link>

      </div>

      
      </div>
      )
}