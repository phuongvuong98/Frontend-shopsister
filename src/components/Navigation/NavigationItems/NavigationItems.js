import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navigationItems = props => {
  // cac item luon hien
  var navItems = [
    { id: "home", text: "Home", link: "/", auth: null },
    { id: "portfolio", text: "Portfolio", link: "/portfolio", auth: null },
    { id: "shop", text: "Shop", link: "/shop", auth: null },
    { id: "contact", text: "Contact", link: "/contact", auth: null }
  ];

  // cac item lien quan den authenticate
  if (props.showAuth) {
    navItems = [
      { id: "login", text: "Log In", link: "/login", auth: false },
      { id: "signup", text: "Sign Up", link: "/signup", auth: false }
    ];
  }

  return [
    // show cac item luon hien
    ...navItems
      .filter(item => item.auth === null)
      .map(item => (
        <li
          key={item.id}
          className={["navigation-item", props.mobile ? "mobile" : ""].join(
            " "
          )}
        >
          <NavLink to={item.link} exact onClick={props.onLoginModal}>
            {item.text}
          </NavLink>
        </li>
      )),
    // show cac item login logout
    ...navItems
      .filter(item => item.auth === props.isAuth)
      .map(item => (
        <li
          key={item.id}
          className={["navigation-item", props.mobile ? "mobile" : ""].join(
            " "
          )}
        >
          <NavLink to={item.link} exact onClick={props.onLoginModal}>
            {item.text}
          </NavLink>
        </li>
      )),
    // show item logout
    props.isAuth && props.showAuth && (
      <li className="navigation-item" key="logout">
        <button onClick={props.onLogout}>Logout</button>
      </li>
    )
  ];
};

export default navigationItems;
