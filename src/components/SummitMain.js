import React from "react";
import { Block } from "../ui/Block";

export const SummitMain = ({ roomInfo }) => {
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
