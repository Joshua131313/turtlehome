import React from "react";
import { Logo } from "../Logo/Logo";

export const Drawer = (props) => {
  const { visible, navlinksrow } = props;
  return (
    <div className={`${visible ? "activedrawer" : ""} drawer`}>
      <Logo />
      <div className="drawerlinks">{navlinksrow}</div>
    </div>
  );
};
