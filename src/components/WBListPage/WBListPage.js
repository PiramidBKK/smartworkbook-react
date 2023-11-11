import {FunnelIcon ,ArrowLeftOnRectangleIcon} from '@heroicons/react/24/outline'
import './WBListPage.css'
import { Link } from 'react-router-dom';
import baseURL from '../../utils/baseURL';
import { fetchconfigsAction } from '../../redux/slices/configSlice/configSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { event } from 'animated';



const WBListPage = () =>{

    const [selectedFileType, setSelectedFileType] = useState([]);

    const [searchText, setSearchText] = useState('');

    //dispatch
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchconfigsAction())
    },[dispatch])

    //get data from store
    const {configs, error, loading} = useSelector((state)=>
        state?.configs
    );

    const configData = configs?.data?.config

    const filteredConfigData = configData?.filter((config) => {
      const searchLower = searchText.toLowerCase();
      return (
        String(config.projectname).toLowerCase().includes(searchLower) ||
        String(config.locationname).toLowerCase().includes(searchLower) ||
        (typeof config.filetypes === 'string' && config.filetypes.toLowerCase().includes(searchLower))
      );
    });


    // let configURL = `${baseURL}/config`

    return (
      <div>
        <div className="LocationText">
          <h1>Project</h1>
        </div>
        <div className="workingTab">
          <div className="filterTab">
            <div className="sort"><input placeholder='Search...' value={searchText} onChange={(event) =>setSearchText(event.target.value)}/></div>
            

          </div>
          <div className="line" />
          <div className="Project-label">
            <h2>Projectname</h2>
            <h2>Location</h2>
            <h2>Filetypes</h2>
        </div>

          <div className="line" />
        </div>

        <div className="Location-Data">
          {filteredConfigData?.map((config) => (
            <div className="config-item">
              <Link to={`wbdetail/${config._id}`} key={config._id} className='link-project'>
                <div className="fetched-text">
                    <div className="fetched-projectname"><h4>{config.projectname}</h4></div>
                    <div className="fetched-location"><h4>{config.locationname}</h4></div>
                    <div className="fetched-filetype"><h4>{config.filetypes}</h4></div>
                </div>

              </Link>
              <div className="project-line" />

            </div>
          ))}
        </div>
      </div>
    );
}

export default WBListPage;
