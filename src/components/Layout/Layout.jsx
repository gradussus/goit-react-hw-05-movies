import { Loader } from 'components/Loader';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Header, Link } from './Layout.styled';

export const Layout = () => {
  return (
    <>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
