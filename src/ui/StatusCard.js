import React from "react";
import { Block } from "../ui/Block";
import styles from "./StatusCard.module.css";
import { ProfilePic } from "./ProfilePic";

export const StatusCard = ({ currentDate, pictureUrl, targetTime }) => {
  const rawTime = new Date(targetTime);
  const h = rawTime.getHours();
  const m = rawTime.getMinutes();
  return (
    <>
      <Block>
        <div className={styles.content}>
          <p className={styles.date}>{currentDate}</p>
          <div className={styles.wrapper}>
            <ProfilePic pictureUrl={pictureUrl} />
            <div>
              <p className="">明日の起床時刻</p>
              <p className={styles.target}>{h + ":" + m}</p>
            </div>
          </div>
        </div>
      </Block>
    </>
  );
};
