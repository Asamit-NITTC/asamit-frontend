import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Block } from "../ui/Block";

export const SummitPending = ({ setCreate }) => {
  const [reload, setReload] = useState(false);
  console.log("レンダリング");
  return (
    <>
      <Block>
        <div>
          <p>まだどのグループにも属していません</p>
          <p>あなたの知り合いと早起きを始めましょう！</p>
          <Button onClick={setCreate}>新しくグループを作る！</Button>
        </div>
        <div>
          <p>招待が届くと表示されます</p>
          <Button onClick={() => setReload(reload ? false : true)}>更新</Button>
        </div>
      </Block>
    </>
  );
};
