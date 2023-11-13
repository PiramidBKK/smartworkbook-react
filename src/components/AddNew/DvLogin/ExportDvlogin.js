import { Link, useParams } from 'react-router-dom'
import './DvloginPopup.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react';
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";
import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportDvlogin(){
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchconfigAction(id))
    },[id])

    const {config, error, loading} = useSelector((state)=> state?.configs)

    const dvloginData = config?.data?.config?.dvlogins;

    const projectName = config?.data?.config?.projectname;

    const tableRef = useRef(null);

    const exportToPDF = () => {
      const input = tableRef.current;
  
      html2canvas(input).then((canvas) =>{
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 175.25;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const padding = 1.27; 
        const positionX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const positionY = padding;
  
        pdf.addImage(imgData, 'PNG', positionX, positionY, imgWidth - 2 * padding, imgHeight - 2 * padding);
  
  
        pdf.save(`User-Login-${projectName}.pdf`);
      });
  
    };

    return (
      <div className="dvlogin-popup-main">
        <div ref={tableRef}>
          <h2>User-Login {projectName}</h2>
          <table>
            <thead>
              <tr>
                <th>Devicename</th>
                <th>Username</th>
                <th>Password</th>
                <th>Ramark</th>
              </tr>
            </thead>
            <tbody>
              {dvloginData?.map((dvlogin) => (
                <tr key={dvlogin._id}>
                  <td>{dvlogin.devicename}</td>
                  <td>{dvlogin.dvusername}</td>
                  <td>{dvlogin.dvpassword}</td>
                  <td>{dvlogin.remark}</td>
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
