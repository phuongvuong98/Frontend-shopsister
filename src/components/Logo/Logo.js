import React from "react";

import classes from "./Logo.module.css";
import LogoImg from "../../assets/logo.png";

const logo = props => (
  <div>
    <img src={LogoImg} alt="Logo" className={classes.logo} />
  </div>
);

export default logo;
