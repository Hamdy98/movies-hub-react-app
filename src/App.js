import './App.css';
import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from './component/Navbar/Navbar';
import Register from './component/Register/Register';
import Footer from './component/Footer/Footer';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import About from './component/About/About';
import Movies from './component/Movies/Movies';
import TvShow from './component/TvShow/TvShow';
import Network from './component/Network/Network';
import People from './component/People/People';
import PageNotFound from './component/PageNotFound/PageNotFound';
import MovieDetails from './component/MovieDetails/MovieDetails';
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes';

function App() {
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [username, setUserName] = useState("");

  function checkLogin() {
    let userDataLogin = localStorage.getItem("token");
    setIsUserLogin(userDataLogin);
  }

  useEffect(() => {
    let lastValueInStorage = localStorage.getItem("token");
    
    if(lastValueInStorage !== null) {
      let userData = jwtDecode(lastValueInStorage);
      setUserName(userData.first_name);
    }

    setIsUserLogin(lastValueInStorage);
  }, [isUserLogin]);

  return (
    <>
      <Navbar isUserLogin={isUserLogin} checkLogin={checkLogin} username={username} setUserName={setUserName}/>
      <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login checkLogin={checkLogin}/>}/>
        <Route path="home" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
        <Route path="about" element={<ProtectedRoutes><About/></ProtectedRoutes>}/>
        <Route path="movies" element={<ProtectedRoutes><Movies/></ProtectedRoutes>}/>
        <Route path="moviedetails/:movieId" element={<ProtectedRoutes><MovieDetails/></ProtectedRoutes>}/>
        <Route path="tv" element={<ProtectedRoutes><TvShow/></ProtectedRoutes>}/>
        <Route path="network" element={<ProtectedRoutes><Network/></ProtectedRoutes>}/>
        <Route path="people" element={<ProtectedRoutes><People/></ProtectedRoutes>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
