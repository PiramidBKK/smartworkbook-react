import './WBDetail.css'

const WBDetail = () =>{
    return(
        <body>
            <div className='select'>
                <label className='labelBox'>
                    <div className='dvdesign'>Device Design</div>
                </label>
                
                <label className='labelBox'>
                    <div className='swdetail'>Switch Detail</div>
                </label>

                <label className='labelBox'>
                    <div className='swinterface'>Switch Interfaces</div>
                </label>

                <label className='labelBox'>
                    <div className='dvlogin'>Device Login</div>
                </label>
            </div>
            <div className='workbook'>
                <div className='Projectname'>Project name</div>
                <div className='projectline'/>
            </div>
        </body>
    )

}


export default WBDetail