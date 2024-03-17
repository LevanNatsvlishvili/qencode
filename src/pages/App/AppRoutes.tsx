import { paths } from '@/routing/Paths';
import Home from './Home';

const AppRoutes = [
  {
    path: paths.app.home,
    element: <Home />,
  },
];
export default AppRoutes;
