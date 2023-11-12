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

  const [exportClick, setExportClick] = useState(false);

  const theLocation = useLocation();


  const pathlocation = theLocation.pathname;
  const arrayPath = theLocation.pathname.split('/');
  const switchId = arrayPath[arrayPath.length - 2]
  const id = arrayPath.pop();




  const locationToExport = () =>{
    if(pathlocation === `/dvdesign-popup/${id}`){
      window.location.href = `/dvdesign-export/${id}`;

    }
    else if(pathlocation === `/dvlogin-popup/${id}`){
      window.location.href = `/dvlogin-export/${id}`;

    }
    else if(pathlocation === `/swdetail-popup/${id}`){
      window.location.href = `/swdetail-export/${id}`;

    }
    else if(pathlocation === `/swinterface-popup/${switchId}/${id}`){
      window.location.href = `/swinterface-export/${switchId}/${id}`;
      
    }
  }

  const handleExportClick = async() =>{
    setExportClick(true);

  }

  useEffect(() =>{
    if(exportClick === true){
      locationToExport();
    }
  },[exportClick])



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
              <>
                <div className="export" onClick={handleExportClick}>
                  
                  <ArrowUpOnSquareIcon className="exporticon" />
                  <div className="exporttext">Export</div>

                </div>
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

      </header>
    );
}

export default HomePageHeader;