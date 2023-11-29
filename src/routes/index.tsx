import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import Edit from '../pages/edit';
import Create from '../pages/create';
import { Layout } from '../components/layout';
import ModelsList from '../pages/models';
export enum ROUTES {
  HOME = '/',
  MODEL = '/:id',
  EDIT_MODEL = '/edit/:id',
  CREATE = '/create',
  NOT_FOUND = '*',
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.MODEL,
        element: <ModelsList />,
      },
      {
        path: ROUTES.EDIT_MODEL,
        element: <Edit />,
      },

      {
        path: ROUTES.CREATE,
        element: <Create />,
      },
    ],
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.HOME} />,
  },
]);
