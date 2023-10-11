import React from "react";
import { Block } from "../ui/Block";
import styles from "./StatusCard.module.css";
import { ProfilePic } from "./ProfilePic";

export const StatusCard = ({ pictureUrl, targetTime }) => {
  return (
    <>
      <Block>
        <div className={styles.content}>
          <p>yyyy-MM-dd</p>
          <ProfilePic pictureUrl={pictureUrl} />
          <p>{targetTime}</p>
        </div>
      </Block>
    </>
  );
};
