import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoutes(props) {
  // function checkPath() {
  //   if(localStorage.getItem("token") === null) {
  //     return <Navigate to="/login"/>
  //   } else {
  //     return this.props.children;
  //   }
  // }
  // useEffect(() => {
  //   checkPath(); 
  // }, []);
  // return (
  //   <></>
  // )

  if(localStorage.getItem("token") === null) {
    return <Navigate to="/login"/>
  } else {
    return props.children;
  }
}
