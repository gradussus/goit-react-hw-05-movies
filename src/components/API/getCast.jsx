import { KEY } from './KEY';
import axios from 'axios';

export const getCast = async id => {
  return (
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}&language=en-US`
      )
      .catch(error => {
        return console.log(error);
      })
  ).data.cast;
};
