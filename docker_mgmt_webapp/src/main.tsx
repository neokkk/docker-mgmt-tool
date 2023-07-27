import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
