import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { EditModel } from '../pages/EditModel';
import { CreateMake } from '../pages/CreateMake';
import ModelsList from '../pages/Models';
import { Layout } from '../components/Layout';
import { EditMake } from '../pages/EditMake';
import { CreateModel } from '../pages/CreateModel';
export enum ROUTES {
  HOME = '/',
  MODEL = '/models/:id',
  EDIT_BRAND = '/brand/:id',
  EDIT_MODEL = '/model/:id',
  CREATE = '/create',
  CREATE_MODEL = '/create/:id',
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
        element: <EditModel />,
      },
      {
        path: ROUTES.EDIT_BRAND,
        element: <EditMake />,
      },

      {
        path: ROUTES.CREATE,
        element: <CreateMake />,
      },

      {
        path: ROUTES.CREATE_MODEL,
        element: <CreateModel />,
      },
    ],
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.HOME} />,
  },
]);
