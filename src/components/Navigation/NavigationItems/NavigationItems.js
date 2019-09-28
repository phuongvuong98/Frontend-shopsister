import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navigationItems = props => {
  var navItems = [
    { id: "home", text: "Home", link: "/", auth: false },
    { id: "portfolio", text: "Portfolio", link: "/portfolio", auth: false },
    { id: "shop", text: "Shop", link: "/shop", auth: false },
    { id: "contact", text: "Contact", link: "/contact", auth: false }
  ];

  if (props.showAuth) {
    navItems = [
      { id: "login", text: "Log In", link: "/login", auth: false },
      { id: "signup", text: "Sign Up", link: "/signup", auth: false }
    ];
  }

  return [
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
    props.isAuth && (
      <li className="navigation-item" key="logout">
        <button onClick={props.onLogout}>Logout</button>
      </li>
    )
  ];
};

export default navigationItems;
