import React from "react";
import ReactDOM from "react-dom";
import "./Auth.css";

const auth = props =>
  ReactDOM.createPortal(
    <section className="auth-form">{props.children}</section>,
    document.getElementById("auth-root")
  );

export default auth;
