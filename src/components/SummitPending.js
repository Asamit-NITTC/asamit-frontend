import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Block } from "../ui/Block";
import styles from "./SummitPending.module.css";

export const SummitPending = ({ setCreate }) => {
  const [reload, setReload] = useState(false);
  console.log("レンダリング");
  return (
    <>
      <Block>
        <div className={styles.content}>
          <div>
            <p>まだどのグループにも属していません</p>
            <p>あなたも知り合いと早起きを始めましょう！</p>
            <Button onClick={setCreate}>新しくグループを作る！</Button>
          </div>
          <div>
            <p>招待が届くと表示されます</p>
            <Button
              onClick={() => setReload(reload ? false : true)}
              visual="secondary"
            >
              更新
            </Button>
          </div>
        </div>
      </Block>
    </>
  );
};
