import React from "react";
import Layout from "./HOC/Layout";
import { Switch } from "react-router-dom";

import PrivateRoute from "./Components/authRoutes/privateRoutes";
import PublicRoute from "./Components/authRoutes/publicRoutes";
import Home from "./Components/home";
import SignIn from "./Components/signin";

import Dashboard from "./Components/admin/Dashboard";
import AdminMatches from "./Components/admin/matches";
import AddEditMatch from "./Components/admin/matches/addEditMatch";
const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />

        <PublicRoute
          {...props}
          restricted={false}
          exact
          path="/"
          component={Home}
        />
        <PublicRoute
          {...props}
          restricted={true}
          exact
          component={SignIn}
          path="/sign_in"
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
