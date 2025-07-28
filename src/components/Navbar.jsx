import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
  const apiKey = import.meta.env.VITE_API;
  const [suggestion,setSuggestion]=useState([])
  const [query,setQuery] =useState('')
  const navigate = useNavigate(); 

  const handlelogo=()=>{
    navigate('/movie-explorer/')
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
        className="navbar navbar-expand-lg"
        style={{
          background: 'linear-gradient(to right,black,rgb(30, 28, 28))',
          color: 'white',
        }}
      >
        <div className="container-fluid">
          <span className="navbar-brand glowing-heading" onClick={handlelogo} style={{fontSize:"27px" }} >
              Movies-Explorer
          </span>
          <button
            className="navbar-toggler"
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
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
              />
              <button className="btn btn-outline-warning" type="submit">
                Search
              </button>

              {suggestion.length > 0 && (
                <ul
                  className="list-group position-absolute z-3 mt-5"
                  style={{
                    top: '10%',
                    left: 0,
                    width: '100%',
                    maxHeight: 'fit-content',
                    overflowY: 'hidden',
                  }}
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
                      style={{ cursor: 'pointer' }}
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