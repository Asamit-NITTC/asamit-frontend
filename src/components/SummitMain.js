import React from "react";
import { RoomCard } from "../ui/RoomCard";

export const SummitMain = ({ roomInfo }) => {
  return (
    <>
      <RoomCard
        roomId={roomInfo.roomId}
        wakeUpTime={roomInfo.wakeUpTime}
        description={roomInfo.description}
      />
    </>
  );
};
