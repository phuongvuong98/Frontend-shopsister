import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, List } from "semantic-ui-react";

import "./NavigationItems.css";

const navigationItems = props => {
  // cac item theo link /route
  var navItems = [
    { id: "home", text: "Home", link: "/", auth: null},
    { id: "Portfolio", text: "Portfolio", link: "https://nguyen-anh-nghiet.herokuapp.com/", auth: null , newTag: 1},
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
    // show cac item luon duoc truy cap
    ...navItems
      .filter(item => item.auth === null)
      .map(item => (
        <li
          key={item.id}
          className={["navigation-item", props.mobile ? "mobile" : ""].join(
            " "
          )}
        >
          {
            item.newTag == 1 && (
              <List.Item href={item.link} target="_blank">
                {item.text}
              </List.Item>
            )
          }
          {

item.newTag != 1 && (<NavLink to={item.link} exact onClick={props.onLoginModal}>
             {item.text}
           </NavLink>)
          }
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
