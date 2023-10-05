import React from "react";
import styles from "./Header.module.css";

export const Header = ({ title, ...props }) => {
  return (
    <div {...props} className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
