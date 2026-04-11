import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MovieStyles.css'; // Import new stylesheet


export default function Navbar() {
  const apiKey = import.meta.env.VITE_API;
  const [suggestion,setSuggestion]=useState([])
  const [query,setQuery] =useState('')
  const navigate = useNavigate(); 

  const handlelogo=()=>{
    navigate('/')
  }

  const handlesearch =(e)=>{
    e.preventDefault()
    if(query.trim()){ //query!=NULL after removing spaces
      navigate(`/movies?q=${encodeURIComponent(query)}`); //encodeURI for making it url friendly
      setQuery('')
      setSuggestion([])
    }
  }

  useEffect(()=>{
    const delay=
      setTimeout(async() => {
        if(query.trim()){
          let data=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
          let parsed_data= await data.json()
          setSuggestion(parsed_data.results.slice(0,5))
        }
        else{
          setSuggestion([])
        }
      }, 300);
    
    return ()=>clearTimeout(delay)
  },[query])

 return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark movie-navbar"
      >
        <div className="container-fluid">
          <span className="navbar-brand glowing-heading" onClick={handlelogo} style={{fontSize:"27px",cursor:"pointer", color: '#ff9900'}} >
              Movies-Explorer
          </span>
          <button
            className="navbar-toggler" // Keep this for bootstrap functionality
            type="button"
            data-bs-toggle="collapse"
            style={{ border: '3px solid orange' }}
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          > 
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link" style={{ color: 'orange' }} href="/">
                  Home
                </a>
              </li> */}
            </ul>
            <form className="d-flex position-relative" role="search" onSubmit={handlesearch}>
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
              />
              <button className="btn btn-warning search-button" type="submit">
                Search
              </button>

              {suggestion.length > 0 && (
                <ul
                  className="suggestion-list"
                >
                  {suggestion.map((movie) => (
                    <li
                      key={movie.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        navigate(`/movies?q=${encodeURIComponent(movie.title)}`);
                        setSuggestion([]);
                        setQuery('');
                      }}
                    >
                      {movie.title}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}