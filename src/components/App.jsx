import { Route, Routes } from 'react-router-dom';
// import { lazy } from 'react';
import { Layout } from './Layout/Layout';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="movies" element="<Movies/>"></Route>
        <Route path="movies/:movieID" element={<MovieDetails />}>
          <Route path="cast" element="<Cast>"></Route>
          <Route path="reviews" element="<Reviews>"></Route>
        </Route>
      </Route>
      <Route path="*" element="<Home>" />
    </Routes>
  );
};