import React from "react";
import { Block } from "../ui/Block";
import { Button } from "./Button";
import styles from "./PendingCard.module.css";

export const PendingCard = ({ roomInfo, approve }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Block>
          <div className={styles.content}>
            <div>
              <h4>招待がきています</h4>
              <p>{roomInfo.description || "エラー"}</p>
            </div>
            <div>
              <Button onClick={approve}>承認</Button>
            </div>
          </div>
        </Block>
      </div>
    </>
  );
};
