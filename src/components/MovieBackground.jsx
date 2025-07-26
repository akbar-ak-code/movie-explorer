import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MovieBackground(props) {
const navigate=useNavigate()
  const handleclick=()=>{
    navigate("/movies/movie",{state:{movie:props}})
  }
  
  return (
    <div
    onClick={handleclick}
      className="movie-card"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${props.poster})`,
        backgroundSize: '40% 100%',
       backgroundRepeat:"no-repeat",
        backgroundPosition: 'center',
        height: '425px',
        borderRadius: '10px',
        position: 'relative',
        color: 'white',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Title at the top */}
      <div
        style={{
          fontSize: '26px',
          fontWeight: 'bold',
          textShadow: '0 0 5px black'
        }}
      >
        {props.title}
      </div>

      {/* Info at the bottom right */}
      <div
        style={{
          alignSelf: 'flex-end',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '5px',
          padding: '6px 10px',
          fontSize: '18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <div>⭐ {props.rating} / 10</div>
        <div>🗳️ {props.votes} votes</div>
        <div>📅 {props.release}</div>
      </div>
    </div>
  )
}
