import React from "react";
import { Button } from "../ui/Button";
import { Block } from "../ui/Block";

export const SummitPending = () => {
  return (
    <>
      <Block>
        <div>
          <p>まだどのグループにも属していません</p>
          <p>あなたの知り合いと早起きを始めましょう！</p>
          <Button>新しくグループを作る！</Button>
        </div>
        <div>
          <p>招待が届くと表示されます</p>
        </div>
      </Block>
    </>
  );
};
