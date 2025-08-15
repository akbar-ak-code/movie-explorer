import React, { useEffect,useRef, useState } from 'react'
import Movieitem from './Movieitem'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navigate,useLocation } from 'react-router-dom';
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
  
  return (
    <>
     <div className='container my-4'>
  
    {query&&movies.length===0&&loading===false?(
    <div className="empty-item">
      <div> <img src="./duck.gif" alt="" style={{height:"82vh",width:"60vw"}}/></div>
      <div className='text'> No Movies Named {query}</div>
    </div>)
    :query&&(
  <div className="row d-flex justify-content-around ">
       {movies.map((movie)=>(
        (movie.vote_average===0||movie.overview==="")?null:
        <div className='col-md-3 mb-4 mx-3 my' key={movie.id}>
            <Movieitem  key={movie.id} rating={movie.vote_average} release={movie.release_date} poster={movie.poster_path} title={movie.original_title} overview={movie.overview} />
       </div>
       ))}
    </div>
    
   )}

 
   </div>
</>
  )
}
