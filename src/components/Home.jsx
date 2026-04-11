import React, { Suspense } from 'react'
import Movies from './Movies'
import { useSearchParams } from 'react-router-dom'

const Slider = React.lazy(() => import('./Slider'));
const Discover = React.lazy(() => import('./Discover'));

const LoadingSpinner = () => <div className="d-flex justify-content-center my-5"><div className="spinner-border text-warning" role="status"><span className="visually-hidden">Loading...</span></div></div>;

export default function Home({setProgress={setProgress}}) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {!query && <Slider title="🔥 Trending Movies" />}
      {!query && <Discover title="Discover" />}
      <Movies setProgress={setProgress}/>
    </Suspense>
  )
}
