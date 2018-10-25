import React from "react";
import { elastic as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Browse
      </a>

      <a className="menu-item" href="/stream">
        Following
      </a>
    </Menu>
  );
};
