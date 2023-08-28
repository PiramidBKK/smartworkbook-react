import {FunnelIcon} from '@heroicons/react/24/outline'
import './WBListPage.css'

const WBListPage = () =>{
    return(
        <body>
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
        </body>
    )
}

export default WBListPage;
