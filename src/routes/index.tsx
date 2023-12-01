import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Edit from '../pages/Edit';
import { CreateForm } from '../pages/Create';
import { Layout } from '../components/Layout';
import ModelsList from '../pages/Models';
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
        element: <CreateForm />,
      },
    ],
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.HOME} />,
  },
]);
