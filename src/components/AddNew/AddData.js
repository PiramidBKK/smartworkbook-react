import { useState } from "react";
import "./AddData.css";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import { createConfigAction } from "../../redux/slices/configSlice/configSlice";

const animetedComponents = makeAnimated();

export default function AddData() {
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
    filetype: "",
  });

  const { projectname, locationname } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { config, loading, error } = useSelector((state) => state?.configs);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createConfigAction(formData))
    console.log(formData);
    console.log(filetypeOption);

    // setFormData({
    //     projectname: "",
    //     locationname: "",
    //     filetype: "",
    // })
  };

  //   useEffect(() => {
  //     if (userInfo?.data?.userFound) {
  //       window.location.href = "/";
  //     }
  //   }, [userInfo]);

  return (
    <div className="AddDataPage">
      <h1>ADD DATA</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="AddProjectname">
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
            // components={animetedComponents}
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
            <input multiple type="file" />
          </div>
        </div>

        <div className="toAddImg">



          {loading ? (
            <LoadingComponent />
          ) : (
            <button className="next-btn-adddata">
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
