import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigation = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: ""
  });
  const [errors, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [recive, setRecive] = useState(true);

  function getCurrentError(key) {
    for(const error of errors) {
      if(error.context.key === key) {
        return error.message
      }
    }
    return "";
  }

  useEffect(() => {
  }, [user]);

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
      let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup", user);
      console.log(data);
      setRecive(true);
      if(data.message === "success") {
        navigation('/login');
      } else {
        setSuccess(data.message);
        }
    }
  }

  function validationUserdata() {
    let rules = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(14).required(),
      last_name: Joi.string().alphanum().min(3).max(14).required(),
      email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net" ,"org"]}}).required(),
      password: Joi.string().min(6).required(),
      age: Joi.number().min(10).max(80).integer().required()
    });
    let validationResult = rules.validate(user, {abortEarly: false});
    if(validationResult.error !== undefined) {
      setError(validationResult.error.details);
      setRecive(true)
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <div className="container">
        <h2 className='my-3'>Register Form</h2>
        <form action="" onSubmit={(event) => {sendUser(event)}}>
          <label>first name</label>
          <input className='form-control my-3' name='first_name' type="text" onChange={(event) => {addUser(event)}}/>
          {getCurrentError('first_name').length === 0 ? '' : <div className='alert alert-danger'>{getCurrentError('first_name')}</div>}

          <label>last name</label>
          <input className='form-control my-3' name='last_name' type="text" onChange={(event) => {addUser(event)}}/>
          {getCurrentError('last_name').length === 0 ? '' : <div className='alert alert-danger'>{getCurrentError('last_name')}</div>}

          <label>age</label>
          <input className='form-control my-3' name='age' type="text" onChange={(event) => {addUser(event)}}/>
          {getCurrentError('age').length === 0 ? '' : <div className='alert alert-danger'>{getCurrentError('age')}</div>}

          <label>email</label>
          <input className='form-control my-3' name='email' type="text" onChange={(event) => {addUser(event)}}/>
          {getCurrentError('email').length === 0 ? '' : <div className='alert alert-danger'>{getCurrentError('email')}</div>}

          <label>password</label>
          <input className='form-control my-3' name='password' type="text" onChange={(event) => {addUser(event)}}/>
          {getCurrentError('password').length === 0 ? '' : <div className='alert alert-danger'>{getCurrentError('password')}</div>}

          <button className="btn btn-info">{recive ? "Register" : <i className='fas fa-spin fa-spinner'></i>}</button>
          <h3 className='bg-success'>{success}</h3>
        </form>
      </div>
    </>
  )
}
