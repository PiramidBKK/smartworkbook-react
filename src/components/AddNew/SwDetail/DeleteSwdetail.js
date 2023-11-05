import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { deleteSwDetailAction, fetchSwDetailAction } from "../../../redux/slices/swdetailSlice/swdetailSlice";

export default function DeleteSwdetail () {
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() =>{
        dispatch(fetchSwDetailAction(id))
    },[id, dispatch])

    const {swdetail} = useSelector((state) => state?.swdetail);
    
    const configId = swdetail?.data?.singleSwdetail?.config;
    const switchName = swdetail?.data?.singleSwdetail?.hostname;

    const onClose = (e) =>{
        window.location.href = `/swdetail-popup/${configId}`

    }

    const onDelete = async (e) => {
      e.preventDefault();
      await dispatch(deleteSwDetailAction(id));

      window.location.href = `/swdetail-popup/${configId}`;
    };
    
    return(
        <div>
        <div className="popup-delete">
          <p>Delete {switchName} ?</p>
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