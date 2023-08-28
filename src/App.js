import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePageHeader from './components/HomePage/HomePageHeader';
import WBListPage from './components/WBListPage/WBListPage';
import Login from './components/Authen/Login';
import WBDetail from './components/WBDetail/WBDetail';
import Register from './components/Authen/Register';
import Forgotpass from './components/Authen/Forgot';
import AddData from './components/AddNew/AddData';
import AddImg from './components/AddNew/AddImg';

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
          <Route path='addnew' element={<AddData />} />         
          <Route path='addnew/addimg' element={<AddImg />} />
                   
        </Routes>
        
      </BrowserRouter>
      

    </div>
  );
}

export default App;
