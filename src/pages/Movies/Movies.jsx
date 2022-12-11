import { getByQuery } from 'components/API/getByQuery';
import { Loader } from 'components/Loader';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [queryArr, setQueryArr] = useState([]);
  const [status, setStatus] = useState('idle');

  const query = searchParams.get('query') ?? '';
  useEffect(() => {
    if (query) {
      console.log('effect');
      console.log(query);

      getByQuery(query).then(setQueryArr);
      setStatus('success');
      setSearchQuery(query);
    }
  }, [query]);

  const location = useLocation();

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim().length === 0) {
      window.alert(`Please enter a request. Spaces does not count`);
      setSearchQuery('');
      return;
    }
    setSearchParams({ query: searchQuery });
    setStatus('pending');
    getByQuery(searchQuery).then(data => {
      if (data.length === 0) {
        setSearchParams({});
        setStatus('noInfo');
        return console.log('noInfo');
      }
      setQueryArr(data);
      setStatus('success');
    });
    setSearchQuery('');
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          value={searchQuery}
          onChange={handleQueryChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
      {status === 'pending' && <Loader />}
      {status === 'idle' && <div> You can find any film</div>}
      {status === 'noInfo' && <div>Sorry, we have no films for this query</div>}
      {status === 'success' && (
        <ul>
          {queryArr.map(({ id, title, original_name }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title || original_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Movies;
