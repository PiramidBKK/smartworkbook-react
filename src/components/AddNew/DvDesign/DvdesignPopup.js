import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDvdesignsAction } from "../../../redux/slices/dvdesignSlice/dvdesignSlice";
import { useParams } from "react-router-dom";




export default function DvdesignPopup(){
  const dispatch = useDispatch


  const { id } = useParams

  console.log(id);
  



      return(
        <div className="dvdesign-popup">
          Hello
        </div>
      )
}