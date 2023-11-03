import { useState } from 'react'
import './UpdateSwinterface.css'
import LoadingComponent from '../../LoadingComp/LoadingComponent'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';
import { createSwDetailAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import { createSwinterfaceAction, fetchSwInterfaceAction, updateSwinterfaceAction } from '../../../redux/slices/swinterfaceSlice/swinterfaceSlice';


export default function EditSwitchInterface (){
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSwInterfaceAction(id));
  }, [id, dispatch]);

  const { swinterface, error, loading, isAdd } = useSelector(
    (state) => state?.swinterface
  );

  const interfaceData = swinterface?.data?.getsingleswinterface;
  const configId = interfaceData?.config;

  //653142995b223ded5a7b08f1

  const [formData, setFormData] = useState({
    connectto: "",
    description: "",
    vlanid: "",
    mode: "",
    label: "",
    remark: "",
  });

  useEffect(() => {
    if (swinterface?.data?.getsingleswinterface) {
      setFormData({
        connectto: interfaceData?.connectto,
        description: interfaceData?.description,
        vlanid: interfaceData?.vlanid,
        mode: interfaceData?.mode,
        label: interfaceData?.label,
        remark: interfaceData?.remark,
      });
    }
  }, [swinterface]);

  const { connectto, description, vlanid, mode, label, remark } = formData;

  // const configData = config?.data?.config?.swdetails;

  // const switchName = configData?.find((swdetail)=>swdetail._id === switchId)

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateSwinterfaceAction({ ...formData, id }));

    window.location.reload();

  };


  return (
    <div className="EditSwInterface">
      <h1> Edit Switch {interfaceData?.port} </h1>
      <div className="Preview"></div>
      <form onSubmit={onSubmitHandler}>
        <div className="main-form">
          <div className="st-form"></div>

          <div className="nd-form">
            <div className="description-form">
              <label>Description</label>
              <input
                onChange={onChangeHandler}
                name="description"
                value={description}
              ></input>
            </div>

            <div className="connectto-form">
              <label>Connect to</label>
              <input
                onChange={onChangeHandler}
                name="connectto"
                value={connectto}
              ></input>
            </div>
          </div>

          <div className="rd-form">
            <div className="vlanid-interface-form">
              <label>Vlan ID</label>
              <input
                onChange={onChangeHandler}
                name="vlanid"
                value={vlanid}
              ></input>
            </div>

            <div className="mode-form">
              <label>Mode</label>
              <input
                onChange={onChangeHandler}
                name="mode"
                value={mode}
              ></input>
            </div>
          </div>

          <div className="fourth-form">
            <div className="label-form">
              <label>Label</label>
              <input
                onChange={onChangeHandler}
                name="label"
                value={label}
              ></input>
            </div>

            <div className="remark-interface-form">
              <label>Remark</label>
              <input
                onChange={onChangeHandler}
                name="remark"
                value={remark}
              ></input>
            </div>
          </div>

          <div className="dvdesign-button">
            <Link to={`/wbdetail/${configId}`} className="back-btn">
              <div className="back">
                <h3>Back</h3>
              </div>
            </Link>

            {loading ? (
              <LoadingComponent />
            ) : (
              <button className="next-btn-swdetail" type="submit">
                <div className="next-swdetail">
                  <h3>Next</h3>
                </div>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

