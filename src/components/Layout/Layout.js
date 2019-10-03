import React from "react";

import "./Layout.css";

const layout = props => {
  return (
    <React.Fragment>
      <header className="mainHeader">{props.header}</header>
      {props.mobileNav}
      {/* <main className="content">{props.children}</main> */}
    </React.Fragment>
  );
};

export default layout;
