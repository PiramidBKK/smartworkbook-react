import { Link } from 'react-router-dom';
import './HomePageHeader.css'
import {PlusCircleIcon, ArrowUpOnSquareIcon, ChevronDownIcon,ArrowLeftOnRectangleIcon} from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/slices/users/userSlice';


const HomePageHeader = () =>{

  const dispatch = useDispatch();

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
                <div className="export">
                  <ArrowUpOnSquareIcon className="exporticon" />
                  <div className="exporttext">Export</div>
                  <div className="lineup" />
                  <ChevronDownIcon className="down" />
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