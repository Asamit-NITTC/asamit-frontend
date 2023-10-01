import React from "react";
import styles from "./TextArea.module.css";

export const TextArea = ({ ...props }) => {
  return <textarea name="message" className={styles.base} {...props} />;
};
