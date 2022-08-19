import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [person, setPerson] = useState([]);

  async function getTrending(mediaType, setterFunction) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=76780030766e96951b66f7598e7a0ef4`);
    setterFunction(data.results);
  }

  useEffect(() => {
    getTrending("movie", setMovies);
    getTrending("tv", setTv);
    getTrending("person", setPerson);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="border w-25 mb-4"></div>
          <h2 className='h3'>Trending<br/>Movies<br/>To Watch Right Now</h2>
          <p className='text-muted'>most watched movies by days</p>
          <div className="border mt-4"></div>
        </div>
        {
          movies.slice(0,10).map((movie, index) => {
            return (
            <div className='col-md-2 mb-3' key={index}>
              <div>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="w-100" alt="Movie" />
                <h3 className='h6 m-2'>{movie.title}</h3>
              </div>
            </div>
            )
          })
        }
      </div>
        {/* -------------- */}
      <div className='row py-5'>
        <div className="col-md-4">
          <div className="border w-25 mb-4"></div>  
          <h2 className='h3'>Trending<br/>Tv<br/>To Watch Now</h2>
          <p className='text-muted'>most watched tv by days</p>
          <div className="border mt-4"></div>
        </div>
        {
          tv.slice(0,10).map((tv, index) => {
            return (
            <div className='col-md-2 mb-3' key={index}>
              <div>
                <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} className="w-100" alt="Tv" />
                <h6 className='h6 my-2'>{tv.name}</h6>
              </div>
            </div>
            )
          })
        }
      </div>
        
        {/* -------------- */}
      <div className='row py-5'>
        <div className="col-md-4">
          <div className="border w-25 mb-4"></div> 
          <h2 className='h3'>People</h2>
          <p className='text-muted'>most celebrated</p>
          <div className="border mt-4"></div>
        </div>
        {
          person.slice(0,10).map((person, index) => {
            return (
            <div className='col-md-2 mb-3' key={index}>
              <div>
                <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} className="w-100" alt="Tv" />
                <h6 className='h6 my-2'>{person.name}</h6>
              </div>
            </div>
            )
          })
        }
      </div>
    </>
  )
}
