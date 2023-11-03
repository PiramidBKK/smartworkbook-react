import { Link, useParams } from 'react-router-dom'
import './DvdesignPopup.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";



export default function DvdesignPopup(){
  const dispatch = useDispatch();


  const { id } = useParams();

  useEffect(()=>{
    dispatch(fetchconfigAction(id));
  },[id])

  const {config, error, loading} = useSelector((state)=> state?.configs)

  const dvdesignData = config?.data?.config?.dvdesigns;

  const dvdesignId = dvdesignData?.map((dvdesign) =>
    dvdesign._id
  )
  


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
            <th>Edit</th>
            <th>Delete</th>

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
              <td><Link to={`/edit-dvdesign/${dvdesign._id}`}><PencilSquareIcon className='pencil-edit'/></Link></td>
              <td><TrashIcon className='delete-trash'/></td>
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