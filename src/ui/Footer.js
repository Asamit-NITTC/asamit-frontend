import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import { MdHome, MdGroups, MdOutlineDataThresholding } from "react-icons/md";

const iconSize = "2.5rem";

export const Footer = ({ ...props }) => {
  return (
    <div {...props} className={styles.root}>
      <div className={styles.nav}>
        <ul>
          <li>
            <NavLink to={"/app/home"}>
              <MdHome size={iconSize} />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/app/summit"}>
              <MdGroups size={iconSize} />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/app/profile"}>
              <MdOutlineDataThresholding size={iconSize} />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
