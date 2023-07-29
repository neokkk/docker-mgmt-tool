import Containers from './pages/Containers.tsx';
import Nodes from './pages/Nodes.tsx';
import Root from './pages/Root.tsx';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Root />,
  },
  {
    id: 'containers',
    path: '/containers',
    element: <Containers />,
  },
  {
    id: 'nodes',
    path: '/nodes',
    element: <Nodes />,
  },
]);

export default router;
