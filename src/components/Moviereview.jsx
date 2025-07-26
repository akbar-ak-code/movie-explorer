import React, { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

export default function Moviereview() {
    const location=useLocation() //it returns a js object and from that we need state key only
    const state=location.state
    const movie=state?.movie
    const navigate=useNavigate();

    if(!movie){
        return <div>data not found.  <button onClick={()=>navigate(-1)}>Go Back</button></div>
    }
   useEffect(()=>{
    window.scrollTo(0,0)
   }) 
  return (
   
    <div>
      <div className="container d-flex justify-content-between my-3">
        <div className="left">
            <div className='poster'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title} />
            </div>
        </div>
        <div className="right" style={{fontFamily:"Raleway, sans-serif"}}>
            <div className='title text-center' > <h2  style={{color:"orange"}}>{movie.title}</h2></div>
            <div className='other-info d-flex'>
                <div className="overview" style={{color:"white",width:"50%"}}>{movie.overview}</div>
                <div className="utils">
                    <div className="ratings"  style={{color:"white"}}>Ratings : {movie.rating}⭐</div>
                    <div className="release"  style={{color:"white"}}>Release Date : {movie.release}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
