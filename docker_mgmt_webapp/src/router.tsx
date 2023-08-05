import { createBrowserRouter } from 'react-router-dom';
import Containers from './pages/Containers.tsx';
import Nodes from './pages/Nodes.tsx';
import Root from './pages/Root.tsx';

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
    children: [
      {
        id: 'index_containers',
        index: true,
      },
      {
        id: 'named_containers',
        path: ':name',
      },
    ],
  },
  {
    id: 'nodes',
    path: '/nodes',
    element: <Nodes />,
    children: [
      {
        id: 'index_nodes',
        index: true,
      },
      {
        id: 'named_nodes',
        path: ':name',
      },
    ],
  },
]);

export default router;
