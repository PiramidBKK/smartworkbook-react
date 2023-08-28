import { useState } from 'react';
import './AddData.css'
import makeAnimated from "react-select/animated";
import Select from 'react-select';
import { Link } from 'react-router-dom';

const animetedComponents = makeAnimated();


const AddData = () =>{


        const [formData, setFormData] = useState({
            projectname: "",
            locationname: "",
            filetype: "",
        })
    
        const {projectname, locationname} = formData;
    
        const onChangeHandler = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          };
    
    
    return(
        <body>
            <div className='AddDataPage'>
            <h1>ADD DATA</h1>
            <form>
            <div className='AddProjectname'>
                <label>Projectname</label>
                <input name='projectname' value={projectname} onChange={onChangeHandler} type='projectname'></input>
            </div>
            <div className='AddLocation'>
                <label>Location</label>
                <input name='locationname' value={locationname} onChange={onChangeHandler} type='locationname'></input>
            </div>
            <div className='AddType' >
                <label>Type</label>

                <Select 
                    components={animetedComponents}
                    name='Type'
                    className='selectTypes'
                />
            </div>
            </form>

            <div className='toAddImg'>
                
                <Link to='/'>
                <div className='back'><h3>Back</h3></div>
                    </Link>
                

                <Link to='addimg'>
                <div className='next'>
                <h3>Next</h3>
                </div>
                </Link>
            </div>

            </div>
        </body>
    )
}

export default AddData;