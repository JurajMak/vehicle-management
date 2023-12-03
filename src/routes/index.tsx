import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { EditForm } from '../pages/EditModel';
import { CreateForm } from '../pages/CreateMake';

import ModelsList from '../pages/Models';
import { Layout } from '../components/Layout';
import Brand from '../pages/EditMake';
export enum ROUTES {
  HOME = '/',
  MODEL = '/models/:id',
  EDIT_BRAND = '/brand/:id',
  EDIT_MODEL = '/models/:id/model/:id',
  CREATE = '/create',
  NOT_FOUND = '*',
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.MODEL,
        element: <ModelsList />,
      },
      {
        path: ROUTES.EDIT_MODEL,
        element: <EditForm />,
      },
      {
        path: ROUTES.EDIT_BRAND,
        element: <Brand />,
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
