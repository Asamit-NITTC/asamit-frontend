import React from "react";
import styles from "./Post.module.css";

export const Post = ({ content, ...props }) => {
  return (
    <div className={styles.base} {...props}>
      <h4>{content.name}</h4>
      <p>{content.comment}</p>
      <span className={styles.time}>createdAt: {content.createdAt}</span>
    </div>
  );
};
