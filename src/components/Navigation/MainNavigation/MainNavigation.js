import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import Logo from "../../Logo/Logo";
import MobileToggle from "../MobileToggle/MobileToggle";
import NavigationItems from "../NavigationItems/NavigationItems";
import NavigationItemsIcon from "../NavigationItemsIcon/NavigationItemsIcon";

const mainNav = props => (
  <nav className={classes.mainNav}>
    <div className={classes.mainNav__logo}>
      <MobileToggle onOpen={props.onOpenMobileNav}></MobileToggle>
      <NavLink to="/">
        <Logo />
      </NavLink>
    </div>
    <ul className={classes.mainNav__items}>
      <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
    </ul>
    <ul className={classes.mainNav__itemsHor}>
      <NavigationItems
        showAuth
        isAuth={props.isAuth}
        onLogout={props.onLogout}
      />
    </ul>
    <ul className={classes.mainNav__itemsHor}>
      <NavigationItemsIcon />
    </ul>
  </nav>
);

export default mainNav;
