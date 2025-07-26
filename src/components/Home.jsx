import React from 'react'
import Movies from './Movies'
import Slider from './Slider'
import { useSearchParams } from 'react-router-dom'
import Discover from './Discover';

export default function Home({setProgress={setProgress}}) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

  return (
    <>
      {!query && <Slider title="🔥 Trending Movies"/>}
      {!query && <Discover title="Discover"/>}
      <Movies setProgress={setProgress}/>
    </>
  )
}
