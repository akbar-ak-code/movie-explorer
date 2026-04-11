import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MovieStyles.css';

export default function MovieBackground(props) {
const navigate=useNavigate()
  const handleclick=()=>{
    navigate("/movies/movie",{state:{movie:props}})
  }

  return (
    <div
      onClick={handleclick}
      className="movie-background-card"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/original${props.poster})`,
      }}
    >
      <div className="movie-background-content">
        <div className="movie-background-poster">
            <img src={`https://image.tmdb.org/t/p/w500${props.poster}`} alt={props.title} loading="lazy" />
        </div>
        <div className="movie-background-info">
            <h2 className="movie-background-title">{props.title}</h2>
            <p className="movie-background-overview">{props.overview.slice(0, 150)}...</p>
            <div className="movie-background-meta">
                <span>⭐ {props.rating.toFixed(1)} / 10</span>
                <span>🗳️ {props.votes} votes</span>
                <span>📅 {props.release}</span>
            </div>
        </div>
      </div>
    </div>
  )
}
