import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.scss";
import "./App.css";
import DefaultLayout from "./containers/DefaultLayout";
import Login1 from "./containers/login";
import ForgotPassword from "./containers/forgot-password";
import ResetPassword from "./containers/reset-password";
import NoMatch from "./views/NoMatch";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <React.Suspense fallback={loading()}> */}
        <Switch>
          <Route exact path="/login" component={Login1} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset/:token1" component={ResetPassword} />
          <Route
            path="/"
            name="Home"
            render={props => <DefaultLayout {...props} />}
          />
          <Route component={NoMatch} />
        </Switch>
        {/* </React.Suspense> */}
      </BrowserRouter>
    );
  }
}

export default App;
