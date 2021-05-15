import React, { ReactElement } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardPage from "../pages/Dashboard/Dashboard.page";
import LoginPage from "../pages/Login/Login.page";
import CreateSimulationPage from "../pages/Simulation/CreateSimulation.page";
import SimulationPage from "../pages/Simulation/Simulation.page";
import PrivateRoute from "./PrivateRoute";

export const MainRoutes = [
  {
    title: "Login",
    path: "/login",
    component: LoginPage,
    private: false,
    exact: true,
  },
  {
    title: "Simulation",
    path: "/simulation",
    component: SimulationPage,
    private: true,
    exact: true,
  },
  {
    title: "New Simulation",
    path: "/simulation/new",
    component: CreateSimulationPage,
    private: true,
    exact: true,
  },
];

const routes = [
  ...MainRoutes,
  {
    path: "/",
    component: DashboardPage,
    private: true,
    exact: true,
  },
];

interface IAppProps {}
export default function Routes(): ReactElement {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) =>
          // TODO: Render Login without Base
          !route.private ? (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact ? route.exact : false}
              render={() => (
                <>
                  <route.component auth={"123"} routeFrom={route.path} />
                </>
              )}
            />
          ) : (
            // private route
            <PrivateRoute
              token=''
              key={route.path}
              path={route.path}
              exact={route.exact ? route.exact : false}
              render={() => (
                <>
                  <route.component auth={"123"} routeFrom={route.path} />
                </>
              )}
            />
          )
        )}
      </Switch>
    </Router>
  );
}
