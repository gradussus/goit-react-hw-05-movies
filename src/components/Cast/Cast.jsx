import { getCast } from 'components/API/getCast';
import { Loader } from 'components/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      {status === 'pending' && <Loader />}
      {status === 'success' && (
        <ul>
          {cast.map(({ profile_path, name, character, id }) => (
            <li>{name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

// useEffect(() => {
//   try {
//         getCast().then(cast => setCast(cast)
//       setStatus('success')
//         )
//   } catch(error) {
//    console.log(error)
//   }
// }, []);

export default Cast;
