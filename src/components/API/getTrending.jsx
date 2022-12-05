import { KEY } from './KEY';
import axios from 'axios';

export const getTrending = async () => {
  return (
    await axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`)
      .catch(error => console.log(error))
  ).data.results;
};
