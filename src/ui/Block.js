import React from "react";
import styles from "./Block.module.css";

export const Block = ({ children, ...props }) => {
  return (
    <div className={styles.base} {...props}>
      {children}
    </div>
  );
};
