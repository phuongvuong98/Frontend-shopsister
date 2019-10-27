import React from "react";

import Button from "../../Button/Button";
import Image from "../../../components/Image/Image";
import "./Post.css";

const post = props => (
  <div className="post__image">
    <a className="post_link" href={props.image}>
      <Image imageUrl={props.image} cover center />
    </a>
  </div>
);

export default post;
