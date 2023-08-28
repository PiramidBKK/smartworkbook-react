import { Link } from 'react-router-dom';
import './HomePageHeader.css'
import {PlusCircleIcon, ArrowUpOnSquareIcon, ChevronDownIcon} from '@heroicons/react/24/outline'

const HomePageHeader = () =>{
    return (
      <header>
        <div className="Header">
          <div className="navbar">
              <div className="addnew">
                <PlusCircleIcon className="plus-icon" />
                <div className="text">Add New</div>
              </div>
              <Link to="/"><img src="./image/piramidLogo.png"></img></Link>
            <div className='export'>
                <ArrowUpOnSquareIcon className='exporticon'/>
                <div className='exporttext'>Export</div>
                <div className='lineup' />
                <ChevronDownIcon className='down'/>
            </div>
          </div>
        </div>
      </header>
    );
}

export default HomePageHeader;