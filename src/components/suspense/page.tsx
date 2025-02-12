import { Suspense } from "react";
import Loader from "../shared/loader";

const RenderRoutes = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default RenderRoutes;
