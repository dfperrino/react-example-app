import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import Detail from './detail/Detail';
import Home from './home/Home';
import Layout from './layout/Layout';
import NoMatch from './nomatch/NoMatch';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<>...</>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/detail/:id',
        element: (
          <Suspense fallback={<>...</>}>
            <Detail />
          </Suspense>
        ),
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
];
