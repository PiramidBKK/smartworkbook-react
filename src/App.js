import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePageHeader from './components/HomePage/HomePageHeader';
import WBListPage from './components/WBListPage/WBListPage';
import Login from './components/Authen/Login';
import WBDetail from './components/WBDetail/WBDetail';
import Register from './components/Authen/Register';
import Forgotpass from './components/Authen/Forgot';
import AddData from './components/AddNew/AddData';
import AuthRoute from './components/AuthRoute/AuthRoute';
import DvDesign from './components/AddNew/DvDesign/DvDesign';
import DvLogin from './components/AddNew/DvLogin/Dvlogin';
import Swdetail from './components/AddNew/SwDetail/Swdetail';
import SwitchInterface from './components/AddNew/SwInterface/Swinterface';
import DvdesignPopup from './components/AddNew/DvDesign/DvdesignPopup';
import DvloginPopup from './components/AddNew/DvLogin/DvloginPopup';
import SwdetailPopup from './components/AddNew/SwDetail/SwdetailPopup';
import SwinterfacePopup from './components/AddNew/SwInterface/SwitchInterface';
import UpdateData from './components/AddNew/UpdateData';
import EditDvdesign from './components/AddNew/DvDesign/EditDvdesign';
import EditDvLogin from './components/AddNew/DvLogin/EditDvlogin';
import EditSwdetail from './components/AddNew/SwDetail/UpdateSwdetail';
import EditSwitchInterface from './components/AddNew/SwInterface/UpdateSwinterface';
import DeleteDvdesign from './components/AddNew/DvDesign/DeleteDvdesign';
import DeleteDvlogin from './components/AddNew/DvLogin/DeleteDvlogin';
import DeleteSwinterface from './components/AddNew/SwInterface/DeleteSwinterface';
import DeleteSwdetail from './components/AddNew/SwDetail/DeleteSwdetail';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* headerpath */}
        <HomePageHeader />
        <Routes>
          {/* bodypath */}
          <Route path="/" element={<WBListPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="workbook" element={<WBDetail />} />
          <Route path="forgotpass" element={<Forgotpass />} />
          <Route
            path="addnew"
            element={
              <AuthRoute>
                <AddData />
              </AuthRoute>
            }
          />
          <Route
            path="update-data/:id"
            element={
              <AuthRoute>
                <UpdateData />
              </AuthRoute>
            }
          />
          <Route
            path="dvdesign/:id"
            element={
              <AuthRoute>
                <DvDesign />
              </AuthRoute>
            }
          />
          <Route
            path="edit-dvdesign/:id"
            element={
              <AuthRoute>
                <EditDvdesign />
              </AuthRoute>
            }
          />
          <Route
            path="delete-dvdesign/:id"
            element={
              <AuthRoute>
                <DeleteDvdesign />
              </AuthRoute>
            }
          />

          <Route
            path="dvlogin/:id"
            element={
              <AuthRoute>
                <DvLogin />
              </AuthRoute>
            }
          />

          <Route
            path="edit-dvlogin/:id"
            element={
              <AuthRoute>
                <EditDvLogin />
              </AuthRoute>
            }
          />

          <Route
            path="delete-dvlogin/:id"
            element={
              <AuthRoute>
                <DeleteDvlogin />
              </AuthRoute>
            }
          />

          <Route
            path="swinterface/:id/:switchId"
            element={
              <AuthRoute>
                <SwitchInterface />
              </AuthRoute>
            }
          />

          <Route
            path="edit-swinterface/:id"
            element={
              <AuthRoute>
                <EditSwitchInterface />
              </AuthRoute>
            }
          />

          <Route
            path="delete-swinterface/:id"
            element={
              <AuthRoute>
                <DeleteSwinterface />
              </AuthRoute>
            }
          />

          <Route
            path="swdetail/:id"
            element={
              <AuthRoute>
                <Swdetail />
              </AuthRoute>
            }
          />

          <Route
            path="edit-swdetail/:id"
            element={
              <AuthRoute>
                <EditSwdetail />
              </AuthRoute>
            }
          />

          <Route
            path="delete-swdetail/:id"
            element={
              <AuthRoute>
                <DeleteSwdetail />
              </AuthRoute>
            }
          />


          <Route path="wbdetail/:id" element={<WBDetail />} />

          <Route path="dvdesign-popup/:id" element={<DvdesignPopup />} />

          <Route path="dvlogin-popup/:id" element={<DvloginPopup />} />

          <Route path="swdetail-popup/:id" element={<SwdetailPopup />} />

          <Route
            path="swinterface-popup/:id/:switchId"
            element={<SwinterfacePopup />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
