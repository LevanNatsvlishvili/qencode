import { paths } from '@/routing/Paths';
import Login from './Login';
import { Navigate } from 'react-router-dom';
import Forgot from './Forgot';
import Reset from './Reset';

const AppRoutes = [
  {
    path: paths.auth.login,
    element: <Login />,
    exact: false,
  },
  {
    path: paths.auth.forgot,
    element: <Forgot />,
    exact: false,
  },
  {
    path: paths.auth.reset,
    element: <Reset />,
    exact: false,
  },
  {
    path: '/',
    element: <Navigate to={paths.auth.login} />,
  },
];

export default AppRoutes;
