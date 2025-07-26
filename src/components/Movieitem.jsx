import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Movieitem(props) {
const navigate=useNavigate()
  const handleclick=()=>{
    navigate("/movies/movie",{state:{movie:props}})
  }
  return (
    <div className="flip-card" onClick={handleclick}>
        <div className="flip-card-inner">
            {/* front side */}
            <div className="flip-card-front card text-center" style={{ maxWidth: '18rem' ,backgroundColor:"black", borderTop: "2px solid orange",
              borderRight: "2px solid orange",
              borderLeft: "2px solid orange",
              borderBottom: "0px"}}>
            <img
            src={`https://image.tmdb.org/t/p/w500${props.poster}`}
            className="card-img-top"
            style={{ height: '300px', objectFit: 'cover' }}
            alt={props.title}
          />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
          </div>
        </div>
            {/* back-side */}
               <div className="flip-card-back card text-white bg-dark p-3" style={{ maxWidth: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.overview.slice(0, 200)}...</p>
            <p><strong>Rating:</strong> ⭐ {props.rating}/10</p>
          </div>
        </div>
        </div>
    </div>
  )
}
