import { getByID } from 'components/API/getByID';
import { Loader } from 'components/Loader';
import { Suspense, useEffect } from 'react';
import { useState } from 'react';
import {
  Poster,
  Title,
  MovieCardLeft,
  MovieCardRight,
  Card,
  Genre,
  Back,
} from './MovieDetails.styled';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { useParams } = require('react-router-dom');

const MovieDetails = () => {
  const { movieID } = useParams();
  const [currentMovie, setCurrentMovie] = useState();
  const [status, setStatus] = useState('idle');

  const { state } = useLocation();

  const from = state?.from ?? '/';

  useEffect(() => {
    try {
      setStatus('pending');
      getByID(movieID).then(data => {
        if (!data) {
          return;
        }
        setStatus('success');
        setCurrentMovie(data.data);
      });
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  }, [movieID]);

  return (
    <>
      {status === 'pending' && <Loader />}
      {status === 'error' && (
        <>
          {' '}
          <div>Sorry, something wrong</div>
          <Back to={from}>Back</Back>
        </>
      )}
      {status === 'success' && (
        <>
          <Card>
            <MovieCardLeft>
              <Back to={from}>
                {
                  <>
                    <span>B</span>
                    <span>A</span>
                    <span>C</span>
                    <span>K</span>
                  </>
                }
              </Back>
              <Poster
                src={`https://image.tmdb.org/t/p/original/${currentMovie.poster_path}`}
                alt="poster"
              />
            </MovieCardLeft>
            <MovieCardRight>
              <Title>
                {currentMovie.title +
                  ` (` +
                  currentMovie.release_date.slice(0, 4) +
                  `)`}
              </Title>
              <p>User score: {currentMovie.vote_average || 'No score'}</p>
              <h2>Overview</h2>
              <p>{currentMovie.overview || 'No overview'}</p>
              <h3>Genres</h3>
              <ul>
                {currentMovie.genres.map(({ id, name }) => (
                  <Genre key={id}> {name} </Genre>
                )) || 'No genres info'}
              </ul>
            </MovieCardRight>
          </Card>
          <hr></hr>
          <h4>Additional information</h4>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
};
export default MovieDetails;
