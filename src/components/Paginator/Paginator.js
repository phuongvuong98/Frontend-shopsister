import React from "react";

import "./Paginator.css";
import Button from "../Button/Button";

const paginator = props => (
  <div className="paginator">
    {props.children}
    <div className="paginator__controls">
      {props.currentPage > 1 && (
        <Button design="small" onClick={props.onPrevious}>
          Previous
        </Button>
      )}
      {props.currentPage < props.lastPage && (
        <Button design="small" onClick={props.onNext}>
          Next
        </Button>
      )}
    </div>
  </div>
);

export default paginator;
