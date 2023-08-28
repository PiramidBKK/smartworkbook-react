import { Link } from 'react-router-dom';
import './AddImg.css'

const AddImg = () =>{


    return(
       <div className='AddImgPage'>
            <div className='AddImgText'>
                <h1>ADD IMAGE</h1>
            </div>

            <div className='AddImgForm'>
                asd
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
       </div> 
    )
}

export default AddImg;