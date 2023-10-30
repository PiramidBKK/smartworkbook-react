import { Link, useParams } from 'react-router-dom'
import './WBDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchconfigAction } from '../../redux/slices/configSlice/configSlice';
import LoadingComponent from '../LoadingComp/LoadingComponent';
import { fetchDvdesignsAction } from '../../redux/slices/dvdesignSlice/dvdesignSlice';
import { fetchDvloginsAction } from '../../redux/slices/dvloginSlice/dvloginSlice';
import { fetchSwDetailsAction } from '../../redux/slices/swdetailSlice/swdetailSlice';
import Select from 'react-select';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import UpdateData from '../AddNew/UpdateData';


export default function WBDetail() {

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(()=>{
        dispatch(fetchconfigAction(id));
        // dispatch(fetchDvdesignsAction(id));
        // dispatch(fetchDvloginsAction(id))
        // dispatch(fetchSwDetailsAction(id))
    },[id]);


    //get data from store
    const {config, error, loading} = useSelector((state)=> state?.configs)
    // const {dvdesigns } = useSelector((state) => state?.dvdesigns)


    //set switch to select
    const [selectSwitch, setSelectSwitch] = useState([]);

    const switchNames = config?.data?.config?.swdetails;

    const handleSwitchChange = (selectedHostname) => {
      setSelectSwitch(selectedHostname);
    };
  
    // Get switch options with value and label
    const switchOptionConverted = switchNames?.map((swdetail) => {
      return {
        value: swdetail._id,
        label: swdetail.hostname,
      };
    });
  
    //fetchData
    const configData = config?.data?.config
    const dvdesignData = config?.data?.config?.dvdesigns;
    const dvloginData = config?.data?.config?.dvlogins;
    const swdetailData = config?.data?.config?.swdetails;
    const swinterfaceData = config?.data?.config?.swinterfaces;

    //map switch details
    const switchDetailName = swdetailData ? swdetailData.map((swdetail)=> `Switch : ${swdetail.hostname}`):[]
    
    //get id from switch detail
    const switchDetailId = swdetailData ? swdetailData.map((swdetail) => swdetail._id):[]

    //check all data
    const hasDvdesign = dvdesignData && dvdesignData.length >= 1;
    const hasDvlogin = dvloginData && dvloginData.length >= 1;
    const hasSwdetail = swdetailData && swdetailData.length >= 1;
    const hasSwinterface = swinterfaceData && swinterfaceData.length >= 1;



    return (
      <div className="wbdetail-body">
        <div className="select">
          <Link to={`/dvdesign/${id}`} key={id}>
            <label className="labelBox">
              <div className="dvdesign">Device Design</div>
            </label>
          </Link>

          <Link to={`/swdetail/${id}`} key={id}>
            <label className="labelBox">
              <div className="swdetail">Switch Detail</div>
            </label>
          </Link>

          <div>
            {selectSwitch && (
              <Link to={`/swinterface/${id}/${selectSwitch.value}`} key={id}>
                <label className="labelBox">
                  <div className="swinterface">Switch Interfaces</div>
                </label>
              </Link>
            )}

            <Select
              className="swinterface-select"
              value={selectSwitch}
              onChange={handleSwitchChange}
              options={switchOptionConverted}
              isSearchable={false}
            />
          </div>

          <Link to={`/dvlogin/${id}`} key={id}>
            <label className="labelBox">
              <div className="dvlogin">Device Login</div>
            </label>
          </Link>
        </div>

        {/* Display page */}

        <div className="workbook">
          <div className="Projectname">
            <h1>{configData?.projectname}</h1>
            <Link to={`/update-data/${id}`} className='link-to-update-data'>
              <PencilSquareIcon className="edit-projectname-icon" />
            </Link>
          </div>

          <div className="projectline" />
        </div>

        <div className="WBDetail-Data">
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              {hasDvdesign && (
                <Link to={`/dvdesign-popup/${id}`}>
                  <div className="dvdesing-wbdetail">Vlan Design</div>
                  <div className="vlan-line" />
                </Link>
              )}
              {hasDvlogin && (
                <Link to={`/dvlogin-popup/${id}`}>
                  <div className="dvdesing-wbdetail">User Login</div>
                  <div className="vlan-line" />
                </Link>
              )}
              {hasSwdetail && (
                <Link to={`/swdetail-popup/${id}`}>
                  <div className="dvdesing-wbdetail">Switch Detail</div>
                  <div className="vlan-line" />
                </Link>
              )}
              {hasSwinterface &&
                switchDetailName.map((switchDetailName, index) => (
                  <Link
                    to={`/swinterface-popup/${id}/${switchDetailId[index]}`}
                  >
                    <div className="dvdesing-wbdetail">{switchDetailName}</div>
                    <div className="vlan-line" />
                  </Link>
                ))}
            </>
          )}
        </div>
      </div>
    );}


