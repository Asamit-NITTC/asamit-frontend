import React from "react";
import styles from "./AchievementCard.module.css";

export const AchievementCard = ({ content, ...props }) => {
  return (
    <div className={styles.base} {...props}>
      <div className={styles.text}>
        <h4>{content.name}</h4>
        <p>{content.comment}</p>
      </div>
      <span className={styles.time}>{content.createdAt}</span>
    </div>
  );
};
