import { Link } from 'react-router-dom'
import './Forgot.css'

const Forgotpass = () =>{
    return(
        <body>
            <div className='Forgotpass'>
                <h2>ลองนึกดีๆ</h2>
                <Link to='/login' className='Linkto'>Back</Link>
            </div>
            

        </body>
    )
}

export default Forgotpass;