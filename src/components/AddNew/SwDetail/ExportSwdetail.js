import { useDispatch, useSelector } from 'react-redux'
import './SwdetailPopup.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { fetchSwDetailsAction } from '../../../redux/slices/swdetailSlice/swdetailSlice';
import Swdetail from './Swdetail';
import { TrashIcon , PencilSquareIcon  } from "@heroicons/react/24/outline";
import { fetchconfigAction } from '../../../redux/slices/configSlice/configSlice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportSwdetail(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchconfigAction(id))
    },[id]);

    const {config, error, loading} = useSelector((state)=> state?.configs)
    const swdetailData = config?.data?.config?.swdetails;
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
  
  
        pdf.save(`Switch-Details-${projectName}.pdf`);
      });
  
    };

    return (
      <div className="swdetail-popup-main">
        <div ref={tableRef}>
        <h2>Switch Details</h2>
        <table>
          <thead>
            <th>Hostname</th>
            <th>Location</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Serialnumber</th>
            <th>Macaddress</th>
            <th>IP Address</th>
            <th>Subnetmask</th>
            <th>Default Gateway</th>
            <th>Ramark</th>

          </thead>
          <tbody>
            {swdetailData?.map((swdetail) => (
              <tr key={swdetail._id}>
                <td>{swdetail.hostname}</td>
                <td>{swdetail.location}</td>
                <td>{swdetail.brand}</td>
                <td>{swdetail.model}</td>
                <td>{swdetail.serialnumber}</td>
                <td>{swdetail.macaddress}</td>
                <td>{swdetail.ipaddress}</td>
                <td>{swdetail.subnetmask}</td>
                <td>{swdetail.defaultgateway}</td>
                <td>{swdetail.remark}</td>

            </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='popup-dvdesign-button'>

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