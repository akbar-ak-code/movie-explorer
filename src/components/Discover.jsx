import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Movieitem from './Movieitem';
import { Autoplay } from 'swiper/modules';


export default function Discover({ title = "Discover" }) {
  const apiKey = import.meta.env.VITE_API;
   const [moviesByGenre, setMoviesByGenre] = useState({});

    const GENRES = [
  { name: "Comedy", id: 35 },
  { name: "Action", id: 28 },
  { name: "Adventure", id: 12 },
  { name: "Animation", id: 16 },
  { name:"Crime",id:80},
  { name:"History",id:36},
  { name:"Horror",id:27},


];

    const fetchMovies = async (genre) => {
    let allMovies = [];
    const totalPages = 1; 

    for (let page = 1; page <= totalPages; page++) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&sort_by=popularity.desc&page=${page}
`;
      const response = await fetch(url);
      const data = await response.json();
      if (data?.results) {
        allMovies=allMovies.concat(data.results);
      }
    }
    return allMovies
  };

  useEffect(() => {
    const loadAllGenres=async()=>{
        const alldata={}
        for(const genre of GENRES){
            const movies=await fetchMovies(genre.id)
            alldata[genre.name]=movies
        }
        setMoviesByGenre(alldata)
    }
    loadAllGenres();
}, []);
  

    
  return (
  <div>
    <h1 className='mb-4 container' style={{ fontWeight: 'bold', color: '#ff9900' }}>{title}</h1>
    <div className="container  my-3">
      {GENRES.map((genre) => (
        <React.Fragment key={genre.name}>
          <h2 className='mb-4 container' style={{ fontWeight: 'bold', color: '#ff9900', fontSize: "25px",marginTop:"3vh" }}>{genre.name}</h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            navigation
              centeredSlides={true} 
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 25,
  }
}}

            speed={800}
            loop={true}
            slidesPerView={5}
            slidesPerGroup={1}
          >
            {(moviesByGenre[genre.name] || []).map((movie) =>
              movie.vote_average === 0 ? null : (
                <SwiperSlide key={movie.id}>
                  <Movieitem
                    rating={movie.vote_average}
                    release={movie.release_date}
                    poster={movie.poster_path}
                    title={movie.original_title}
                    overview={movie.overview}
                    votes={movie.vote_count}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </React.Fragment>
      ))}
    </div>
  </div>
);
}
