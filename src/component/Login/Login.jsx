import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({checkLogin}) {
  let navigation = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errors, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [recive, setRecive] = useState(true);

  function addUser(event) {
    setError([]);
    let myUser = {...user};
    myUser[event.target.name] = event.target.value;
    setUser(myUser);
  }

  async function sendUser(event) {
    event.preventDefault();
    setRecive(false);
    if(validationUserdata() === true) {
      let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signin", user);
      setRecive(true);
      if(data.message === "success") {
        localStorage.setItem("token", data.token);
        checkLogin();
        navigation('/home');
      } 
    }
  }

  function validationUserdata() {
    let rules = Joi.object({
      email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net" ,"org"]}}).required(),
      password: Joi.string().min(6).required()
    });
    let validationResult = rules.validate(user, {abortEarly: false});
    if(validationResult.error !== undefined) {
      setError(validationResult.error.details);
      setRecive(true);
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <div className="container">
        <h2 className='my-3'>Login Form</h2>
        {errors.length > 0 ? errors.map((error, index) => {return <p key={index} className='alert alert-danger'>{error.message}</p>}) : ""}
        <form action="" onSubmit={(event) => {sendUser(event)}}>
          <label>
            email
          </label>
          <input className='form-control my-3' name='email' type="text" onChange={(event) => {addUser(event)}}/>
          <label>
            password
          </label>
          <input className='form-control my-3' name='password' type="text" onChange={(event) => {addUser(event)}}/>
          <button className="btn btn-info">{recive ? "Login" : <i className='fas fa-spin fa-spinner'></i>}</button>
          <h3 className='bg-success'>{success}</h3>
        </form>
      </div>
    </>
  )
}

