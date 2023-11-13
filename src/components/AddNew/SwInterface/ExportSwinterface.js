import { useDispatch, useSelector } from 'react-redux'
import './SwitchInterface.css'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSwDetailAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import { fetchconfigsAction } from '../../../redux/slices/configSlice/configSlice';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportSwinterface(){
    const dispatch = useDispatch();
    const {id, switchId} = useParams();



    useEffect(()=>{
      dispatch(fetchSwDetailAction(switchId))
    },[switchId, dispatch])
  
    const {swdetail} = useSelector((state)=> state?.swdetail);

    
    const swdetailData = swdetail?.data?.singleSwdetail;



    const swdetailName = swdetailData;
    const swinterfaceData = swdetailName ? swdetailName.swinterfaces : [];

    const modelImage = swdetailName?.modelimg;   

    const tableRef = useRef(null);
    // const imageRef = useRef(null)

    const exportToPDF = () => {
      const input = tableRef.current;
  
      html2canvas(input, {allowTaint: true, useCORS: true}).then((canvas) =>{
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 175.25;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const padding = 1.27; 
        const positionX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const positionY = padding;
  
        pdf.addImage(imgData, 'PNG', positionX, positionY, imgWidth - 2 * padding, imgHeight - 2 * padding);
  
  
        pdf.save(`Interfaces-${swdetailName.hostname}.pdf`);
      });
  
    };

    return (
      <div className="swinterface-popup-main">
        <div ref={tableRef}>
        <h2>
          Switch Interface : {swdetailName ? swdetailName.hostname : null}
        </h2>
        <div className="image-of-switch">

          <img src={modelImage} className='switch-image' />
        </div>
        <div className="switchdetail-data">
          <div className="Hardware-detail">
            <table className="hardware">
              <thead>Hardware Detail</thead>
              <tbody>
                <tr>
                  <td>Product ID</td>
                  <td>{swdetailName?.model}</td>
                </tr>
                <tr>
                  <td>S/N</td>
                  <td>{swdetailName?.serialnumber}</td>
                </tr>
                <tr>
                  <td>MAC ADDRESS</td>
                  <td>{swdetailName?.macaddress}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="Configuration-detail">
            <table className="configuration">
              <thead className='sub-thead'>
                Configuration Detail
              </thead>
              <tbody>
                <tr>
                  <td>IP Address</td>
                  <td>{swdetailName?.ipaddress}</td>
                </tr>
                <tr>
                  <td>Hostname</td>
                  <td>{swdetailName?.hostname}</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>{swdetailName?.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <table>
          <thead>
            <th>Interface</th>
            <th>Connect to</th>
            <th>Description</th>
            <th>Vlan ID</th>
            <th>Mode</th>
            <th>Label</th>
            <th>Ramark</th>

          </thead>
          <tbody>
            {swinterfaceData?.map((swinterface) => (
              <tr key={swinterface._id}>
                <td>{swinterface.port}</td>
                <td>{swinterface.connectto}</td>
                <td>{swinterface.description}</td>
                <td>{swinterface.vlanid}</td>
                <td>{swinterface.mode}</td>
                <td>{swinterface.label}</td>
                <td>{swinterface.remark}</td>
          
            </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="popup-dvdesign-button">
          <Link to={`/wbdetail/${id}`} className="back-btn-dvdesign">
            <div className="back-dvdesign">
              <h3>Back</h3>
            </div>
          </Link>

          <div className="ok-btn-dvdesign" onClick={exportToPDF}>
              <div className="ok-dvdesign">
                <h3>Export to PDF</h3>
              </div>
            </div>
        </div>
      </div>
    );


}