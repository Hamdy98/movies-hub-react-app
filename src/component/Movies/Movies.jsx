import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Movies() {
  const [movies, setMovies] = useState([]);

  let nums = new Array(13).fill(1).map((element, index) => index+1);

  async function getTrending(pageNumber) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=76780030766e96951b66f7598e7a0ef4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    setMovies(data.results);
  }

  useEffect(() => {
    getTrending(1);
  }, []);

  return (
    <>
      {movies ? 
        <div className="row">
          <div className="col-md-4">
            <div className="border w-25 mb-4"></div>
            <h2 className='h3'>Trending<br/>Movies<br/>To Watch Right Now</h2>
            <p className='text-muted'>most watched movies by days</p>
            <div className="border mt-4"></div>
          </div>
          {
            movies.map((movie, index) => {
              return (
              <div className='col-md-2  mb-3' key={index}>
                <div className='position-relative'>
                  <Link to={`/moviedetails/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="w-100" alt="Movie" />
                  </Link>
                  <h3 className='h6 my-2'>{movie.title}</h3>
                  <h5 className='h6 position-absolute top-0 end-0 p-2 m-1 bg-dark rounded-pill'>{(movie.vote_average).toFixed(1)} <i className='fa fa-star text-warning'></i></h5>
                </div>
              </div>
              )
            })
          }
        </div>
      : <div className='vh-100 d-flex align-items-center justify-content-center'>
          <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div> 
      }

      <nav aria-label="..." className='py-5'>
        <ul className="pagination pagination-sm d-flex justify-content-center">
          {nums.map((pageNumber, index) => <li onClick={()=>getTrending(pageNumber)} key={index} className="page-item"><a className="page-link bg-transparent text-white">{pageNumber}</a></li>)}
        </ul>
      </nav>
    </>
  )
}
