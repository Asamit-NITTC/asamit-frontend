import React from "react";
import { useSummit } from "../hooks/useSummit";
import { useSummitRoomInfo } from "../hooks/useSummitRoomInfo";
import { Block } from "../ui/Block";

export const SummitMain = () => {
  const [{ roomId }] = useSummit();
  const { roomInfo } = useSummitRoomInfo(roomId);

  return (
    <>
      <Block>
        <h2>ルーム</h2>
        <p>roomId: {roomInfo.roomId}</p>
        <p>wakeUpTime: {roomInfo.wakeUpTime}</p>
        <p>description: {roomInfo.description}</p>
      </Block>
    </>
  );
};
