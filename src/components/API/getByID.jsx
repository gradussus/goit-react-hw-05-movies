import { KEY } from './KEY';
import axios from 'axios';

export const getByID = async id => {
  return await axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
    .catch(error => console.log(error));
};
