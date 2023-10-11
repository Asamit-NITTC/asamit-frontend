import React from "react";
import styles from "./TwoTimeDisp.module.css";

export const TwoTimeDisp = ({ main, sub }) => {
  return (
    <>
      <div className={styles.time}>
        <p className={styles.result}>{main}</p>
        <p className={styles.obj}>{sub}</p>
      </div>
    </>
  );
};
