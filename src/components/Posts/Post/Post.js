import React from "react";

import Button from "../../Button/Button";
import Image from "../../../components/Image/Image";
import "./Post.css";

const post = props => (
  <div className="post__image">
    <Image imageUrl={props.image} cover center />
  </div>
);

export default post;
