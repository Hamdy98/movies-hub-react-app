import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

// authontication and authorization

export default function MovieDetails() {
  const [movieDetails, setMovieDetailes] = useState(null);

  let {movieId} = useParams();

  async function getMovieDetailes(movieId) {
    let {data} =await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=76780030766e96951b66f7598e7a0ef4&language=en-US`)
    setMovieDetailes(data);
  }

  useEffect(() => {
    getMovieDetailes(movieId);

    // console.log(movieId);
  }, []);

  return (
    <>
      {movieDetails? 
          <div className="row">
            <div className="col-md-4">
              <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="Movie Image" className='w-100'/>
            </div>
            <div className="col-md-8">
              <h2 className='p-2'>{movieDetails.title}</h2>
              <p className='text-muted py-3'>{movieDetails.overview}</p>
              <ul>
                <li>budget : {movieDetails.budgit}</li>
                {/* <li>vote : {Math.round(movieDetails.vote_average)} / 10</li> */}
                <li>vote : {(movieDetails.vote_average).toFixed(1)} / 10</li>
                <li>vote_count : {movieDetails.vote_count}</li>
              </ul>
            </div>
          </div>
        :<div className='vh-100 d-flex align-items-center justifi-content-center'>
          <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div>
      }
    </>
  )
}
