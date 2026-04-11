import React, { useEffect,useRef, useState } from 'react'
import Movieitem from './Movieitem'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navigate,useLocation } from 'react-router-dom';
import './MovieStyles.css';
import Slider from './Slider';

export default function Movies(props) {
  const apiKey = import.meta.env.VITE_API;
  const [movies,setMovies]=useState([])
  const [SearchParams]=useSearchParams()
  const[loading,setLoading]=useState(false)
  const [page,setPage]=useState(1)
  // const [redirecting,setRedirecting]=useState(true)

  const query=SearchParams.get("q");
  const navigate=useNavigate()
  const location=useLocation();
  
  // const  hasRedirected = useRef(false);

  const newMovies=async()=>{
    setLoading(true)
    props.setProgress(10)
      let url= query?`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`:
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
      let data=await fetch(url);
      props.setProgress(40)
      let parsed_data=await data.json()
      props.setProgress(70)
      setMovies(parsed_data.results||[])
       setLoading(false)
      props.setProgress(100)
  }

   useEffect(() => {
    newMovies();
    // setRedirecting(false)
  }, [query]);

  // if(redirecting) return null
  
  const validMovies = movies.filter(movie => movie.vote_average !== 0 && movie.overview !== "");

  return (
    <>
     <div className='container my-4'>
  
    {query&&validMovies.length===0&&loading===false?(
    <div className="empty-item">
      <img src="./duck.gif" alt="No movies found" className="empty-item-gif"/>
      <div className='empty-item-text'> No Movies Found for "{query}"</div>
    </div>)
    :query&&(
  <div className="row g-4 justify-content-center">
       {validMovies.map((movie)=>(
        <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={movie.id}>
            <Movieitem rating={movie.vote_average} release={movie.release_date} poster={movie.poster_path} title={movie.original_title} overview={movie.overview} />
       </div>
       ))}
    </div>
    
   )}

 
   </div>
</>
  )
}
