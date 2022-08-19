import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({isUserLogin, checkLogin, username, setUserName}) {
  let navigation = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigation("/login");
    checkLogin(null);
    setUserName("");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent shadow">
          <div className="container">
          <a className="navbar-brand" href="#">Hello {username}</a>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              {isUserLogin !== null ?
                <>
                  <li className="nav-item">
                  <Link to='home' className="nav-link" href="#">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to='about' className="nav-link" href="#">About</Link>
                </li>
                <li className="nav-item">
                  <Link to='movies' className="nav-link" href="#">Movies</Link>
                </li>
                <li className="nav-item">
                  <Link to='tv' className="nav-link" href="#">Tv Show</Link>
                </li>
                <li className="nav-item">
                  <Link to='network' className="nav-link" href="#">Network</Link>
                </li>
                <li className="nav-item">
                  <Link to='people' className="nav-link" href="#">People</Link>
                </li>
                </> : ''}
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center mb-sm-3 mb-xl-0">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                <i className="fab fa-spotify mx-2"></i>
              </li>
              <li className="nav-item">
                <input type="text" className='form-control w-75 mx-2' placeholder='search'/>
              </li>
              {isUserLogin === null ? 
                <>
                  <li className="nav-item">
                    <Link to='register' className="nav-link" href="#">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='login' className="nav-link" href="#">Login</Link>
                  </li>
                </>
              : ""}
              
              {isUserLogin !== null ? 
                <li className="nav-item">
                <a className="nav-link" href="#" onClick={logOut}>Logout</a>
                </li>
              : ""}
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  )
}
