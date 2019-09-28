import React, { Component, Fragment } from "react";

import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNav from "./components/Navigation/MainNavigation/MainNavigation";
import Backdrop from "./components/Backdrop/Backdrop";
import MobileNav from "./components/Navigation/MobileNavigation/MobileNavigation";

import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";

class App extends Component {
  state = {
    showMobileNav: false,
    showBackdrop: false,
    isAuth: false,
    token: null,
    authLoading: false,
    showBackdropAuth: true
  };

  mobileNavHandler = isOpen => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  backdropClickHandler = () => {
    this.setState({ showMobileNav: false, showBackdrop: false });
  };

  backdropAuthClickHandler = isOpen => {
    this.setState({ showBackdropAuth: isOpen });
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    // localStorage.removeItem("token");
    // localStorage.removeItem("expiryDate");
    // localStorage.removeItem("userId");
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path="/login"
          exact
          render={props => (
            <LoginPage
              {...props}
              onLogin={this.loginHandler}
              loading={this.state.authLoading}
            />
          )}
        ></Route>
        <Route
          path="/signup"
          exact
          render={props => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Fragment>
        <Layout
          header={
            <Toolbar>
              {this.state.showBackdrop && (
                <Backdrop onClick={this.backdropClickHandler}></Backdrop>
              )}
              <MainNav
                onLoginModal={this.backdropAuthClickHandler.bind(this, true)}
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
              ></MainNav>
            </Toolbar>
          }
          mobileNav={
            <MobileNav
              open={this.state.showMobileNav}
              mobile
              onChooseItem={this.mobileNavHandler.bind(this, false)}
              onLogout={this.logoutHandler}
              isAuth={this.state.isAuth}
            ></MobileNav>
          }
        ></Layout>
        {routes}
      </Fragment>
    );
  }
}

export default App;
