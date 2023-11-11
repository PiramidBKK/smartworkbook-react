import React from "react";
import { useParams } from "react-router-dom";

export default function ExportPage  (){

    const {id} = useParams();

    // const path = window.location.pathname;

    console.log(id);

    return(
        <div>
            hi
        </div>
    )
 
}
