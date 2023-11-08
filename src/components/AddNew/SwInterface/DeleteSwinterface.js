import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { deleteSwInterfaceAction, fetchSwInterfaceAction } from "../../../redux/slices/swinterfaceSlice/swinterfaceSlice";
import { useEffect } from "react";
import { fetchconfigAction } from "../../../redux/slices/configSlice/configSlice";

export default function DeleteSwinterface () {
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() =>{
        dispatch(fetchSwInterfaceAction(id))
    },[id, dispatch]);

    const {swinterface} = useSelector((state) => state?.swinterface)

    const configId = swinterface?.data?.getsingleswinterface?.config;
    const SwData = swinterface?.data?.getsingleswinterface?.port;
    
    useEffect(() =>{
        dispatch(fetchconfigAction(configId))
    },[id, dispatch]);

    const {config} = useSelector((state) => state?.configs)

    const swdetailId = config?.data?.config?.swdetails

    

    const onClose = (e) =>{
        window.location.href = `/wbdetail/${configId}`
    }

    const onDelete = async (e) => {
      e.preventDefault();
      await dispatch(deleteSwInterfaceAction(id));
      console.log(configId);
      window.location.href = `/wbdetail/${configId}`;
    };
    
    return(
        <div>
        <div className="popup-delete">
          <p>Delete {SwData} Data ?</p>
          <div className="popup-button">
            <button onClick={onDelete} className="delete-button">
              Delete
            </button>
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
    
}