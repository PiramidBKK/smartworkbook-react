import { Link, useParams } from 'react-router-dom'
import './WBDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchconfigAction } from '../../redux/slices/configSlice/configSlice';
import LoadingComponent from '../LoadingComp/LoadingComponent';
import { fetchDvdesignsAction } from '../../redux/slices/dvdesignSlice/dvdesignSlice';


export default function WBDetail() {
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(()=>{
        dispatch(fetchconfigAction(id));
        dispatch(fetchDvdesignsAction(id));
    },[id]);


    //get data from store
    const {config, error, loading} = useSelector((state)=> state?.configs)
    // const {dvdesigns } = useSelector((state) => state?.dvdesigns)

    const configData = config?.data?.config
    const dvdesignData = config?.data?.config?.dvdesigns;

    console.log(dvdesignData);

    const hasDvdesign = dvdesignData && dvdesignData.length >= 1;



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

          <Link to={`/swinterface/${id}`} key={id}>
            <label className="labelBox">
              <div className="swinterface">Switch Interfaces</div>
            </label>
          </Link>

          <Link to={`/dvlogin/${id}`} key={id}>
            <label className="labelBox">
              <div className="dvlogin">Device Login</div>
            </label>
          </Link>
        </div>
        <div className="workbook">
          <div className="Projectname">
            <h1>{configData?.projectname}</h1>
          </div>

          <div className="projectline" />
        </div>

        <div className="WBDetail-Data">
          {loading ? (
            <LoadingComponent />
          ) : hasDvdesign ? (
            <Link to={`/dvdesign-popup/${id}`}><div className="dvdesing-wbdetail">Vlan Design</div><div className="vlan-line" />
            </Link>
          ) : null}
        </div>
      </div>
    );}

