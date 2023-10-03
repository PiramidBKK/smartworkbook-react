import { Link } from 'react-router-dom'
import './WBDetail.css'

export default function WBDetail() {

    return(
        <div className='wbdetail-body'>
            <div className='select'>
                <Link to='/dvdesign'>
                <label className='labelBox'>
                    <div className='dvdesign'>Device Design</div>
                </label>
                </Link>
                
                <Link to='/swdetail'>
                <label className='labelBox'>
                    <div className='swdetail'>Switch Detail</div>
                </label>

                </Link>

                <Link to='/swinterface'>
                <label className='labelBox'>
                    <div className='swinterface'>Switch Interfaces</div>
                </label>
                </Link>

                <Link to='/dvlogin'>
                <label className='labelBox'>
                    <div className='dvlogin'>Device Login</div>
                </label>
                </Link>
            </div>
            <div className='workbook'>
                <div className='Projectname'><h1>Project name</h1></div>
                <div className='projectline'/>
            </div>
        </div>
    )

}

