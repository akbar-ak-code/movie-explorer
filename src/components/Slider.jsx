import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Movieitem from './Movieitem';
import { Autoplay } from 'swiper/modules';
import MovieBackground from './MovieBackground';
export default function Slider({ title = "Trending Movies" }) {
  const apiKey = import.meta.env.VITE_API;
    const [movies,setMovies]=useState([])

    useEffect(() => {
  const fetchMovies = async () => {
    let allMovies = [];
    const totalPages = 6; 

    for (let page = 1; page <= totalPages; page++) {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data?.results) {
        allMovies=allMovies.concat(data.results);
      }
    }
    setMovies(allMovies);
  };

  fetchMovies();
}, []);

    
  return (
    <div>
      <div className="container my-3">
        <h2 className='mb-4' style={{fontWeight: 'bold', color: '#ff9900',fontSize:"25px"}}>{title}</h2>
        <Swiper
            modules={[Navigation,Autoplay]}
            spaceBetween={20}
            navigation
            autoplay={{
                delay:2500,
                disableOnInteraction:false,
            }}
            speed={800} // transition speed
            loop={true} // optional but makes it smoother
            slidesPerView={1}
            slidesPerGroup={1}
           
        //     breakpoints={{320: { slidesPerView: 2 },
        //   640: { slidesPerView: 3 },
        //   1024: { slidesPerView: 5 },}}
        >
            {movies.map((movie)=>
                movie.vote_average===0?null:(
                    <SwiperSlide key={movie.id}>
                        <MovieBackground 
                            rating ={movie.vote_average}
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
      </div>
    </div>
  )
}
