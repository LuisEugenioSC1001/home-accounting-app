import Loader from "Components/common/Loader";
import HomePage from "layouts/homePage";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

export default function Router() {
  const routes = useRoutes([{ path: "/", element: <HomePage /> }]);
  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}
