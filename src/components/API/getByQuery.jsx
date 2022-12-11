import { KEY } from './KEY';
import axios from 'axios';

export const getByQuery = async query => {
  //   console.log(query);
  return (
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&include_adult=false`
      )
      .catch(error => {
        return console.log(error);
      })
  ).data.results;
};
