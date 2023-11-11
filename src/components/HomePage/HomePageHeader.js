import { Link, useLocation, useParams } from 'react-router-dom';
import './HomePageHeader.css'
import {PlusCircleIcon, ArrowUpOnSquareIcon} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/slices/users/userSlice';
import { useState } from 'react';
import SwinterfacePopup from '../AddNew/SwInterface/SwitchInterface';
import ExportPage from '../ExportContext/ExportPage';
import { useEffect } from 'react';
import { fetchconfigAction } from '../../redux/slices/configSlice/configSlice';


const HomePageHeader = () =>{

  const dispatch = useDispatch();


  const location = useLocation();
  const id = location.pathname.split('/').pop();

  // useEffect(() =>{
  //   fetchconfigAction(id)
  // },[id])

  // const {config} = useSelector((state) => state?.configs)


  const [exportClick, setExportClick] = useState(false);

  const handleExportClick = () =>{
    console.log("hello");
    setExportClick(true);
  }

  //get user login from local storage
  const user = JSON.parse(localStorage.getItem('userInfo'))

  const isLoggedIn = user?.data?.token ? true : false;

  const logoutHandler = () => {
    dispatch(logoutAction());
    //reload
    window.location.reload();
    };

    return (
      <header>
        <div className="Header">
          <div className="navbar">
            {isLoggedIn && (
              <>
                <Link to="/addnew" className='add-new-all'>
                  <div className="addnew">
                    <PlusCircleIcon className="plus-icon" />
                    <div className="text">Add New</div>
                  </div>
                </Link>
              </>
            )}

            <Link to="/">
              <div className="test">
                <img
                  src={process.env.PUBLIC_URL + "/image/piramidLogo.png"}
                  alt="โลโก้"
                  className="logo"
                />
              </div>
            </Link>

            {isLoggedIn && (
              <><Link to={`export-page/${id}`}>
                <div className="export" >
                  
                  <ArrowUpOnSquareIcon className="exporticon" />
                  <div className="exporttext">Export</div>

                </div></Link>
              </>
            )}
          </div>
        </div>
        <div className="sub-navbar">
          {!isLoggedIn && (
            <>
              <div className="login-nav">
                <Link to="/login">
                  <div className="Loginnav">
                    <h3>Login</h3>
                  </div>
                </Link>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
                <div className="logout-nav" onClick={logoutHandler}>
                  <Link to="/">
                    <div className="Logoutnav">
                      <h3>Logout</h3>
                    </div>
                  </Link>
                </div>
            </>
          )}

        </div>
        {exportClick && <SwinterfacePopup />}

      </header>
    );
}

export default HomePageHeader;