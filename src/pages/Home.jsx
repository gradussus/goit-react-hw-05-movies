// import { getTrending } from 'components/API/getTrending';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getTrending } from 'components/API/getTrending';

const Home = () => {
  const [trending, setTranding] = useState([]);

  useEffect(() => {
    getTrending().then(data => setTranding(data));
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      <ul>
        {trending.map(({ id, title }) => (
          <li key={id}>
            <Link to={`movies/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
