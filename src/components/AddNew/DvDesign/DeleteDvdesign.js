import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteDvdesignAction, fetchDvdesignAction } from "../../../redux/slices/dvdesignSlice/dvdesignSlice";
import './DeleteDvdesign.css'

export default function DeleteDvdesign(){

    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() =>{
        dispatch(fetchDvdesignAction(id))
    },[id, dispatch])

    const {dvdesign} = useSelector((state) => state?.dvdesigns)
    const configId = dvdesign?.data?.dvdesign?.config;

    const vlanId = dvdesign?.data?.dvdesign?.vlanid;

    const onClose = (e) =>{
            window.location.href = `/dvdesign-popup/${configId}`
    }

    const onDelete = async (e) => {
      e.preventDefault();
      await dispatch(deleteDvdesignAction(id));

      window.location.href = `/dvdesign-popup/${configId}`;
    };



    return (
      <div>
        <div className="popup-delete">
          <p>Delete Vlan {vlanId} ?</p>
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
    );
}


