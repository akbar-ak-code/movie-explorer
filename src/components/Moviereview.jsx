import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import './MovieStyles.css';

export default function Moviereview() {
    const location=useLocation() //it returns a js object and from that we need state key only
    const state=location.state
    const movie=state?.movie
    const navigate=useNavigate();
    const [backdrop, setBackdrop] = useState('');
    const apiKey = import.meta.env.VITE_API;

    if(!movie){
        return <div className="container text-center mt-5">
            <h2>Movie data not found.</h2>
            <button className="btn btn-warning mt-3" onClick={()=>navigate(-1)}>Go Back</button>
        </div>
    }

   useEffect(()=>{
        window.scrollTo(0,0);
        // Fetch backdrop from movie details if not available in props
        const fetchBackdrop = async () => {
            // The movie object from props might not have backdrop_path
            // so we can fetch it again if needed, but for now we assume it's there or use poster
            const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : `https://image.tmdb.org/t/p/original${movie.poster}`;
            setBackdrop(backdropUrl);
        }
        fetchBackdrop();
   }, [movie])

  return (
    <div className="movie-review-container" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${backdrop})`}}>
      <div className="container movie-review-content">
        <div className="review-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title} className="img-fluid rounded" />
        </div>
        <div className="review-details">
            <h1 className="review-title">{movie.title}</h1>
            <p className="review-overview">{movie.overview}</p>
            <div className="review-meta"><span>⭐ {typeof movie.rating === 'number' ? movie.rating.toFixed(1) : movie.rating}/10</span> | <span>📅 {movie.release}</span></div>
        </div>
      </div>
    </div>
  )
}
