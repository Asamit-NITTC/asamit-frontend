import React from "react";
import styles from "./Header.module.css";

export const Header = ({ title, ...props }) => {
  return (
    <div {...props} className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};
