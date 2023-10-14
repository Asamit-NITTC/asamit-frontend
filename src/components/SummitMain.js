import React from "react";
import { RoomCard } from "../ui/RoomCard";
import { Post } from "../ui/Post";
import { useRoomPost } from "../hooks/useRoomPost";

export const SummitMain = ({ uid, roomId, roomInfo }) => {
  const { roomPosts } = useRoomPost(uid, roomId);

  return (
    <>
      <RoomCard
        roomId={roomInfo.roomId}
        wakeUpTime={roomInfo.wakeUpTime}
        description={roomInfo.description}
      />
      {(roomPosts[0] !== "") &
        roomPosts.map((post) => (
          <Post
            key=""
            content={{
              name: post.userId,
              comment: post.comment,
              createdAt: post.createdAt,
            }}
          />
        ))}
    </>
  );
};
