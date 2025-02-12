import { Outlet } from "react-router-dom";
import { Router } from "./router";

const Private = () => {
  return (
    <Router>
      <Outlet />
    </Router>
  );
};

export default Private;
