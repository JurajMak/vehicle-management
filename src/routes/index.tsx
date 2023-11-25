import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Edit from "../pages/edit";
import Create from "../pages/create";
export enum Routes {
  HOME = "/home",
  EDIT = "/edit/:vehicle",
  CREATE = "/create",
  NOT_FOUND = "*",
}

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Home />,
  },
  {
    path: Routes.EDIT,
    element: <Edit />,
  },
  {
    path: Routes.CREATE,
    element: <Create />,
  },
  {
    path: Routes.NOT_FOUND,
    element: <Navigate to={Routes.HOME} />,
  },
]);
