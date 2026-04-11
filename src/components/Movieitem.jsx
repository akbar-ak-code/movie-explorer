import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MovieStyles.css';

export default function Movieitem(props) {
const navigate=useNavigate()
  const handleclick=()=>{
    navigate("/movies/movie",{state:{movie:props}})
  }
  return (
    <div className="movie-card-container" onClick={handleclick}>
      <div className="flip-card">
        <div className="flip-card-inner">
            {/* front side */}
            <div className="flip-card-front">
            <img
              src={props.poster ? `https://image.tmdb.org/t/p/w500${props.poster}` : 'placeholder.jpg'}
              alt={props.title}
              loading="lazy"
            />
            <div className="movie-info-overlay">
              <h5 className="card-title">{props.title}</h5>
            </div>
            </div>
            {/* back-side */}
               <div className="flip-card-back">
          <div className="card-body-back">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.overview.slice(0, 200)}...</p>
            <p><strong>Rating:</strong> ⭐ {props.rating}/10</p>
          </div>
        </div>
        </div>
    </div>
    </div>
  )
}
