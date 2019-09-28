import React from "react";
import { Icon, List } from "semantic-ui-react";

import "./NavigationItemsIcon.css";

const navigationItems = props => {
  var navItems = [
    {
      id: "facebook",
      text: "fb",
      link: "https://www.facebook.com/nguyen.anhnghiet",
      color: "blue"
    },
    {
      id: "instagram",
      text: "Instagram",
      link: "https://www.instagram.com/nguyen_anh_nghiet/",
      color: "orange"
    },
    {
      id: "behance",
      text: "Behance",
      link: "https://www.behance.net/anhnghiet",
      color: "teal"
    }
  ];

  return [
    ...navItems
      .filter(item => item.auth === props.isAuth)
      .map(item => (
        <List.Item href={item.link} target="_blank">
          <Icon
            bordered
            inverted
            name={item.id}
            color={item.color}
            size="big"
          />
        </List.Item>
      ))
  ];
};

export default navigationItems;
