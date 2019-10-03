import React, { Component, Fragment } from "react";

import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNav from "./components/Navigation/MainNavigation/MainNavigation";
import Backdrop from "./components/Backdrop/Backdrop";
import MobileNav from "./components/Navigation/MobileNavigation/MobileNavigation";

import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";

import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import HomePage from "./pages/Home/Posts";
import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";

class App extends Component {
  state = {
    showMobileNav: false,
    showBackdrop: false,
    isAuth: false,
    token: null,
    authLoading: false,
    error: null
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
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  loginHandler = (event, authData) => {
    // ngan viec re-open trang do
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  signupHandler = (event, authData) => {
    // ngan re-open lai trang
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            // <HomePage userId={this.state.userId} token={this.state.token} />
            <HomePage
              userId={"5d9229b6427c5611410e6d89"}
              token={
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBodW9uZ3Z1b25nOThAZ21haWwuY29tIiwidXNlcklkIjoiNWQ5MjI5YjY0MjdjNTYxMTQxMGU2ZDg5IiwiaWF0IjoxNTcwMTA5NjE1LCJleHAiOjE1NzAxMTMyMTV9.zXMCOSPTWZhNt-0aNWnckQBPDceexGGUk4HQjQntDxY"
              }
            />
          )}
        />
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
    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <FeedPage userId={this.state.userId} token={this.state.token} />
            )}
          />
          {/* <Route
            path="/:postId"
            render={props => (
              <SinglePostPage
                {...props}
                userId={this.state.userId}
                token={this.state.token}
              />
            )}
          /> */}
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Fragment>
        <Layout
          header={
            <Toolbar>
              {this.state.showBackdrop && (
                <Backdrop onClick={this.backdropClickHandler}></Backdrop>
              )}
              <ErrorHandler
                error={this.state.error}
                onHandle={this.errorHandler}
              />
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
