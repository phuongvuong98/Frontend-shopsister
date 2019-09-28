import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import "./MobileNavigation.css";
import NavigationItemsIcon from "../NavigationItemsIcon/NavigationItemsIcon";

const mobileNavigation = props => (
  <nav className={["mobile-nav", props.open ? "open" : ""].join(" ")}>
    <ul
      className={["mobile-nav__items", props.mobile ? "mobile" : ""].join(" ")}
    >
      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={props.isAuth}
        onLogout={props.onLogout}
      />
    </ul>
    <ul
      className={["mobile-nav__itemsHor", props.mobile ? "mobile" : ""].join(
        " "
      )}
    >
      <NavigationItems
        showAuth
        isAuth={props.isAuth}
        onLogout={props.onLogout}
      />
    </ul>
    <ul
      className={["mobile-nav__itemsHor", props.mobile ? "mobile" : ""].join(
        " "
      )}
    >
      <NavigationItemsIcon />
    </ul>
  </nav>
);

export default mobileNavigation;
