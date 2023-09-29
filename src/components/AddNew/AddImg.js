import { Link } from 'react-router-dom';
import './AddImg.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { event } from 'animated';

const AddImg = () =>{

    const dispatch = useDispatch;

    const [files, setFiles] = useState;
    const [fileErr, setFileErr] = useState;

    const fileHandleChange = (event) =>{
        console.log(event);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
    }


    return(
       <div className='AddImgPage'>
            <div className='AddImgText'>
                <h1>ADD IMAGE</h1>
            </div>

            <form>
            <div className='AddImgForm'>
                
                </div>
    
                <div className='toWbList'>
                    
                    <Link to='/addnew'>
                    <div className='backtoaddnew'><h3>Back</h3></div>
                        </Link>
                    
                    <Link to='/workbooklist'>
                    <div className='nexttowblist'>
                    <h3>Next</h3>
                    </div>
                    </Link>
                </div>
            </form>
       </div> 
    )
}

export default AddImg;