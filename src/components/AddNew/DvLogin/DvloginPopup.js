import { Link, useParams } from 'react-router-dom'
import './DvloginPopup.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";
import { useState } from 'react';

export default function DvloginPopup(){
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchconfigAction(id))
    },[id])

    const [popupOpen, setPopupOpen] = useState(false);
    const [itemDelete, setItemDelete] = useState();

    const {config, error, loading} = useSelector((state)=> state?.configs)

    const dvloginData = config?.data?.config?.dvlogins;

    return (
      <div className="dvlogin-popup-main">
        <h2>User-Login</h2>
        <table>
          <thead>
            <tr>
              <th>Devicename</th>
              <th>Username</th>
              <th>Password</th>
              <th>Ramark</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dvloginData?.map((dvlogin) => (
              <tr key={dvlogin._id}>
                <td>{dvlogin.devicename}</td>
                <td>{dvlogin.dvusername}</td>
                <td>{dvlogin.dvpassword}</td>
                <td>{dvlogin.remark}</td>
                <td>
                  <Link to={`/edit-dvlogin/${dvlogin._id}`}>
                    <PencilSquareIcon className="pencil-edit" />
                  </Link>
                </td>
                <td>
                  <Link to={`/delete-dvlogin/${dvlogin._id}`}>
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

          <Link to={`/dvlogin/${id}`} className="ok-btn-dvdesign">
            <div className="ok-dvdesign">
              <h3>OK</h3>
            </div>
          </Link>
        </div>
      </div>
    );
}
