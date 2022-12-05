import { getByID } from 'components/API/getByID';

const { useParams } = require('react-router-dom');

const MovieDetails = () => {
  const a = useParams();
  console.log(getByID(a.movieID).then(t => console.log(t.data)));
  return <p>{a.movieID}</p>;
};
export default MovieDetails;
