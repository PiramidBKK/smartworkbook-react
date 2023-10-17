import { useState } from "react";
import "./AddData.css";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import { createConfigAction } from "../../redux/slices/configSlice/configSlice";
import { useEffect } from "react";

const animetedComponents = makeAnimated();

export default function AddData() {

  //files
  const  [files, setFiles] = useState([]);
  const [fileErrs, setFileErrs] = useState([]);
  const [fileLabels, setFileLabels] = useState([]);

  //const fileChangeHandler
  const  fileHandleChange = (event) =>{
    const newFiles = Array.from(event.target.files);
    const newErrs = [];
    const newFileLabels = [];
    
    //file validation
    newFiles.forEach(file=>{
      if(file?.size > 2000000){
        fileErrs.push(`${file?.name} is too large`)
      }
      if (!file?.type?.startsWith("image/")) {
        newErrs.push(`${file?.name} is not an image`);
      }
      newFileLabels.push(file.name);
    }
  )

    setFiles((prevFiles) =>[...prevFiles, ...newFiles]);
    setFileErrs(newErrs);
    setFileLabels((prevLabels)=>[...prevLabels, newFileLabels])

  };

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

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    projectname: "",
    locationname: "",
    filetypes: "",

  });

  const { projectname, locationname } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //get data from store
  const { config, isAdded, loading, error } = useSelector((state) => state?.configs);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createConfigAction({
        ...formData,
        files,
        filetypes: filetypeOption.label,
        fileLabels
      })
    );

    setSubmitButtonClicked(true);

    //setFormData
    const setFormData = {
      projectname: "",
      locationname: "",
      filetypes: "",
    };
  };

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const ProjectId = config?.data?.config._id

    useEffect(() => {
      if (submitButtonClicked && config?.data?.config) {
        window.location.href = `wbdetail/${ProjectId}`;
      }
    },[config], [submitButtonClicked]);

  return (
    <div className="AddDataPage">
      <h1>ADD DATA</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="AddProjectname">
        {error && <p className='displayError-add-data'>{error?.message}</p>}

          <label>Projectname</label>
          <input
            name="projectname"
            value={projectname}
            onChange={onChangeHandler}
            type="projectname"
          ></input>
        </div>
        <div className="AddLocation">
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

        <div className="addimg">
          Upload Image
          <div className="addimg-btn">
            <input multiple 
            onChange={fileHandleChange}
            type="file"
             />
          </div>
        </div>
 
        <div className="toAddImg">

          {loading ? (
            <LoadingComponent />
          ) : (
            <button 
            className="next-btn-adddata" 
            type="submit"
            >
              <div className="next-long">
                <h3>Next</h3>
              </div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
