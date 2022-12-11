// import { getTrending } from 'components/API/getTrending';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getTrending } from 'components/API/getTrending';

const Home = () => {
  const [trending, setTranding] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrending().then(data => setTranding(data));
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      <ul>
        {trending.map(({ id, title, original_name }) => (
          <li key={id}>
            <Link to={`movies/${id}`} state={{ from: location }}>
              {title || original_name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
