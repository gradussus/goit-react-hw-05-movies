import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCast } from 'components/API/getCast';
import { Loader } from 'components/Loader';

import { CastList, Img, Card } from './Cast.styled';
import placeholder from './placeholdeCast.jpg';

const Cast = () => {
  const { movieID } = useParams();
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    try {
      setStatus('pending');
      getCast(movieID).then(cast => {
        setCast(cast);
        setStatus('success');
      });
    } catch (error) {
      console.log(error);
    }
  }, [movieID]);
  return (
    <>
      <hr></hr>
      {status === 'pending' && <Loader />}
      {status === 'success' && (
        <CastList>
          {cast.map(({ profile_path, name, character, id }) => (
            <Card key={id}>
              <Img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/original${profile_path}`
                    : placeholder
                }
                alt="character-photo"
              />

              <p>
                <b> Name: {name} </b>{' '}
              </p>
              <p>
                <u> Character: {character}</u>
              </p>
            </Card>
          ))}
        </CastList>
      )}
    </>
  );
};

export default Cast;
