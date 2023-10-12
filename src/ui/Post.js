import React from "react";
import styles from "./Post.module.css";

export const Post = ({ content, ...props }) => {
  return (
    <div className={styles.base} {...props}>
      <h3>{content.name}</h3>
      <p>{content.comment}</p>
      <span className={styles.time}>createdAt: {content.createdAt}</span>
    </div>
  );
};
