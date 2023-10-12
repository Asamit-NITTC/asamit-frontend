import React from "react";
import { RoomCard } from "../ui/RoomCard";
import { Post } from "../ui/Post"

export const SummitMain = ({ roomInfo }) => {
  return (
    <>
      <RoomCard
        roomId={roomInfo.roomId}
        wakeUpTime={roomInfo.wakeUpTime}
        description={roomInfo.description}
      />
      <Post
        content={{name: "test", comment: "てすと", createdAt: "2023"}}
      />
    </>
  );
};
