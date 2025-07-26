import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import { Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";
import Moviereview from './components/Moviereview';
import Footer from './components/Footer';

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Navbar />
      <LoadingBar
        color="#d7861cff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route path="/" element={<Home setProgress={setProgress} />} />
        <Route path="/movies" element={<Movies setProgress={setProgress} />} />
        <Route path="/movies/movie" element={<Moviereview />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
