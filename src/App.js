import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Router,
  BrowserRouter
} from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import "./App.css";
import DefaultLayout from "./containers/DefaultLayout";
import Login1 from "./containers/login";
import ForgotPassword from "./containers/forgot-password";
import ResetPassword from "./containers/reset-password";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login1"
              name="Login Page1"
              render={props => <Login1 {...props} />}
            />
            <Route
              exact
              path="/forgot-password"
              name="ForgotPassword"
              render={props => <ForgotPassword {...props} />}
            />
            <Route
              exact
              path="/reset/:token1"
              name="ResetPassword"
              render={props => <ResetPassword {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={props => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
