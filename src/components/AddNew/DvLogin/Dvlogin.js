import { Link } from 'react-router-dom';
import './DvDesign.css'
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComp/LoadingComponent';

export default function DvLogin (){

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

}

