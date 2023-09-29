import {FunnelIcon ,ArrowLeftOnRectangleIcon} from '@heroicons/react/24/outline'
import './WBListPage.css'
import { Link } from 'react-router-dom';

const WBListPage = () =>{
    return(
        <div>
            <div className='LocationText'>
                <h1>Location</h1>
            </div>
            <div className='workingTab' >
                    <div className='filterTab'>
                        <div className='sort'>Sort By</div>
                        <FunnelIcon className='filter'/>

                    </div>
                    <div className='line'/>

                </div>

            


        </div>

    )
}

export default WBListPage;
