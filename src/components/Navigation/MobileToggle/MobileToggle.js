import React from "react";

import "./MobileToggle.css";
import Button from "../../Button/Button";

const mobileToggle = props => (
  <Button design="mobileToggle" onClick={props.onOpen}>
    Menu
  </Button>
);

export default mobileToggle;
