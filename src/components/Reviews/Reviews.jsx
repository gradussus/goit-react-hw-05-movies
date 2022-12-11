import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getReviews } from 'components/API/getReviews';
import { Loader } from 'components/Loader';

const Reviews = () => {
  const { movieID } = useParams();
  const [status, setStatus] = useState('idle');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    try {
      setStatus('pending');
      getReviews(movieID).then(reviews => {
        setReviews(reviews);
        setStatus('success');
        if (reviews.length === 0) {
          setStatus('noInfo');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [movieID]);

  return (
    <>
      <hr></hr>
      {status === 'pending' && <Loader />}
      {status === 'noInfo' && <p>Sorry, no reviews, yet</p>}
      {status === 'success' && (
        <ul>
          {reviews.map(({ id, content, author }) => (
            <li key={id}>
              <h5>{author}</h5>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
