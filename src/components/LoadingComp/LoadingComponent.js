import './LoadingComponent.css'
import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = () => {
    return(
        <div className="Loading">
            <ReactLoading type='bubbles' color='black' />
        </div>
    )

}

export default LoadingComponent;
