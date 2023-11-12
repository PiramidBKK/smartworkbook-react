import { Link, useParams } from 'react-router-dom'
import './DvdesignPopup.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react';
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";
import { tab } from '@testing-library/user-event/dist/tab';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



export default function ExportDvdesign(){
  const dispatch = useDispatch();


  const { id } = useParams();

  useEffect(()=>{
    dispatch(fetchconfigAction(id));
  },[id])

  const {config, error, loading} = useSelector((state)=> state?.configs)

  const dvdesignData = config?.data?.config?.dvdesigns;

  const projectName = config?.data?.config?.projectname;

  const dvdesignId = dvdesignData?.map((dvdesign) =>
    dvdesign._id
  )
  
  const tableRef = useRef(null);

  const exportToPDF = () => {
    const input = tableRef.current;

    html2canvas(input).then((canvas) =>{
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 175.25;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const padding = 1.27; // ขอบเขตในหน่วยมิลลิเมตร (1.27 ซม.ที่แปลงเป็นมิลลิเมตร)
      const positionX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
      const positionY = padding;

      pdf.addImage(imgData, 'PNG', positionX, positionY, imgWidth - 2 * padding, imgHeight - 2 * padding);


      pdf.save(`Vlan-Design-${projectName}.pdf`);
    });

  };


      return (
        <div className="dvdesign-popup-main" >
          <div ref={tableRef}>
            <h2>Vlan Design {projectName}</h2>
            <table>
              <thead>
                <tr>
                  <th>VLAN ID</th>
                  <th>VLAN Name</th>
                  <th>IP/Subnet</th>
                  <th>Gateway</th>
                  <th>Hostrange</th>
                  <th>Ramark</th>

                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {dvdesignData?.map((dvdesign) => (
                  <tr key={dvdesign._id}>
                    <td>{dvdesign.vlanid}</td>
                    <td>{dvdesign.vlanname}</td>
                    <td>{dvdesign.ipsubnet}</td>
                    <td>{dvdesign.gateway}</td>
                    <td>{dvdesign.hostrange}</td>
                    <td>{dvdesign.remark}</td>
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