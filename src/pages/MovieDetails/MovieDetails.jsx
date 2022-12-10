import { getByID } from 'components/API/getByID';
import { Loader } from 'components/Loader';
import { Suspense, useEffect } from 'react';
import { useState } from 'react';
import { Poster, Title } from './MovieDetails.styled';
import { Link, Outlet } from 'react-router-dom';

const { useParams } = require('react-router-dom');

const MovieDetails = () => {
  const { movieID } = useParams();
  const [currentMovie, setCurrentMovie] = useState();
  const [status, setStatus] = useState('idle');

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
    <main>
      {status === 'pending' && <Loader />}
      {status === 'success' && (
        <>
          <Poster
            src={`https://image.tmdb.org/t/p/original/${currentMovie.poster_path}`}
            alt="poster"
          />
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
              <li key={id}>{name}</li>
            )) || 'No genres info'}
          </ul>
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
    </main>
  );
};
export default MovieDetails;
