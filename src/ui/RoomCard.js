import React from "react";
import { Block } from "../ui/Block";
import styles from "./RoomCard.module.css";
import { MdEdit, MdPersonAdd } from "react-icons/md";

export const RoomCard = ({ roomId, wakeUpTime, description }) => {
  return (
    <>
      <Block>
        <div className={styles.content}>
          <div className={styles.username}>
            <p>ルームの説明:</p>
            <h4 className={styles.disp}>{description}</h4>
          </div>
          <p className={styles.uid}>roomID: {roomId}</p>
          <div className={styles.userpoint}>
            <p>ルームの起床時刻</p>
            <h3 className={styles.time}>{wakeUpTime.slice(11, 16)}</h3>
          </div>
        </div>
        <div className={styles.options}>
          <MdEdit size="2.5rem" />
          <MdPersonAdd size="2.5rem" />
        </div>
      </Block>
    </>
  );
};
