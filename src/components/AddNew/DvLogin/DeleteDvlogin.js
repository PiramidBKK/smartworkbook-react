import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { deleteDvloginAction, fetchDvloginAction } from "../../../redux/slices/dvloginSlice/dvloginSlice";

export default function DeleteDvlogin () {
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() =>{
        dispatch(fetchDvloginAction(id))
    },[id, dispatch])

    const {dvlogin} = useSelector((state) => state?.dvlogin)
    const configId = dvlogin?.data?.getsingledvlogin?.config;
    const DvUsername = dvlogin?.data?.getsingledvlogin?.devicename
    ;

    const onClose = (e) =>{
        window.location.href = `/dvlogin-popup/${configId}`
    }

    const onDelete = async (e) => {
      e.preventDefault();
      await dispatch(deleteDvloginAction(id));

      window.location.href = `/dvlogin-popup/${configId}`;
    };
    
    return(
        <div>
        <div className="popup-delete">
          <p>Delete {DvUsername} User-Pass ?</p>
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