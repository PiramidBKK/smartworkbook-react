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
import Modal from './utils/reactPlayGround';
import DvdesignPopup from './components/AddNew/DvDesign/DvdesignPopup';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        {/* headerpath */}
        <HomePageHeader />
        <Routes>
          {/* bodypath */}     
          <Route  path='/' element={<WBListPage />}/>
          <Route  path='login' element={<Login/>}/>
          <Route  path='register' element={<Register/>}/>
          <Route path='workbook' element={<WBDetail />}/>
          <Route path='forgotpass' element={<Forgotpass />} />
          <Route path='addnew' element={
            <AuthRoute>
              <AddData />
            </AuthRoute>
          } />         
          <Route path='dvdesign/:id' element={
            <AuthRoute>
              <DvDesign />
            </AuthRoute>} />

          <Route path='dvlogin/:id' element={
            <AuthRoute>
              <DvLogin />
            </AuthRoute>
          } />

                   

          <Route path='swinterface/:id' element={
            <AuthRoute>
              <SwitchInterface />
            </AuthRoute>
          } />         

          <Route path='swdetail/:id' element={
            <AuthRoute>
              <Swdetail />
            </AuthRoute>
          } />

          <Route path='wbdetail/:id' element={
            <AuthRoute>
              <WBDetail />
            </AuthRoute>
          } />

          <Route path='dvdesign-popup/:id' element={
          <DvdesignPopup />
          } />

                   
        </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
