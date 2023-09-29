import { Link } from 'react-router-dom'
import './Forgot.css'

const Forgotpass = () =>{
    return(
        <div>
            <div className='Forgotpass'>
                <h2>ลองนึกดีๆ</h2>
                <Link to='/login' className='Linkto'><h3>นึกออกแล้ว</h3></Link>
            </div>
            

        </div>
    )
}

export default Forgotpass;