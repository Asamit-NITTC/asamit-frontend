import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Block } from "../ui/Block";
import { PendingCard } from "../ui/PendingCard";

export const SummitPending = ({ approve, setCreate, isInvited, roomInfo }) => {
  const [reload, setReload] = useState(false);
  const handleApprove = () => {
    approve();
    setReload(reload ? false : true);
  };
  console.log("レンダリング");
  return (
    <>
      <Block>
        <div className="default-margin">
          <p>まだどのグループにも属していません</p>
          <p className="default-margin">
            あなたも知り合いと早起きを始めましょう！
          </p>
          <Button onClick={setCreate}>新しくグループを作る！</Button>
        </div>
        <div className="default-margin">
          <p className="default-margin">招待が届くと表示されます</p>
          <Button
            onClick={() => setReload(reload ? false : true)}
            visual="secondary"
          >
            更新
          </Button>
        </div>
        {isInvited && (
          <div>
            <PendingCard roomInfo={roomInfo} approve={handleApprove} />
          </div>
        )}
      </Block>
    </>
  );
};
