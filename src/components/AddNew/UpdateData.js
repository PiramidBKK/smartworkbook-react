import { useState } from "react";
import "./UpdateData.css";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import { createConfigAction, fetchconfigAction, updateconfigAction } from "../../redux/slices/configSlice/configSlice";
import { useEffect } from "react";

const animetedComponents = makeAnimated();

export default function UpdateData() {
  //get id from params
    const { id } = useParams();
    const dispatch = useDispatch();


    //fetch workbook
    useEffect(()=>{
      dispatch(fetchconfigAction(id))
    },[id, dispatch]
    )



  //filetypes
  const filetypes = [
    "Network System",
    "Firewall System",
    "Server System",
    "CCTV System",
    "Telephone System",
    "IPTV System",
    "Internet Gateway",
    "Clients (PC , Laptop)",
    "WiFi System",
    "Access Control",
    "Digital Signage",
    "Cabling",
    "Other"
  ];

  const [filetypeOption, setFiletypeOption] = useState([]);
  const handleFiletypeChange = (filetypes) => {
    setFiletypeOption(filetypes);
  };

  //convert filetype
  const filetypeOptionsConverted = filetypes?.map((filetype) => {
    return {
      value: filetype,
      label: filetype,
    };
  });

  const { config, isUpdated, loading, error } = useSelector((state) => state?.configs);

  const [formData, setFormData] = useState({
    projectname: config?.data?.config?.projectname,
    locationname: config?.data?.config?.locationname,
    filetypes: "",

  });

  const { projectname, locationname } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //get data from store

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateconfigAction({
        ...formData,
        filetypes: filetypeOption.label,
        id
      })
    );

    setSubmitButtonClicked(true);

    setFormData({
      projectname: '',
      locationname:'',
      filetypes: '',
    })

  };

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const ProjectId = config?.data?.config._id

    useEffect(() => {
      if (submitButtonClicked && config?.data?.config) {
        window.location.href = `wbdetail/${ProjectId}`;
      }
    },[config], [submitButtonClicked]);

  return (
    <div className="UpdateDataPage">
      <h1>UPDATE DATA</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="Update-Projectname">
        {error && <p className='displayError-add-data'>{error?.message}</p>}

          <label>Projectname</label>
          <input
            name="projectname"
            value={projectname}
            onChange={onChangeHandler}
            type="projectname"
          ></input>
        </div>
        <div className="Update-Location">
          <label>Location</label>
          <input
            name="locationname"
            value={locationname}
            onChange={onChangeHandler}
            type="locationname"
          ></input>
        </div>
        <div className="AddType">
          <label>Type</label>

          <Select
            components={animetedComponents}
            name="filetypes"
            className="selectTypes"
            options={filetypeOptionsConverted}
            isSearchable={true}
            isLoading={false}
            onChange={(item) => handleFiletypeChange(item)}
          />
        </div>

        <div className="finishUpdate">
            
        <Link to={`/wbdetail/${id}`} className="update-back-btn">
                <div className="update-back">
                  <h4>Back</h4>               
                </div>
              </Link>

        {loading ? (
              <LoadingComponent />
            ) : (
              <button className="update-next-btn" type="submit">
                <div className="update-next">
                  <h3>Next</h3>
                </div>
              </button>
            )}


        </div>
      </form>
    </div>
  );
}
