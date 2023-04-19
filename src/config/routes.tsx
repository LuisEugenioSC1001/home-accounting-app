import Loader from "Components/common/Loader";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
    },
    { path: "*", element: <Loader /> },
  ]);
  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}
