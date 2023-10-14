import React from "react";
import { Post } from "../ui/Post";
import { useReports } from "../hooks/useReports";

export const TimeLine = () => {
  const { roomPosts, nameFromUid } = useReports();
  console.log(roomPosts);

  return (
    <>
      {roomPosts[0].userId !== "" &&
        roomPosts.map((post) => (
          <Post
            key={""}
            content={{
              name: nameFromUid[post.userId],
              uid: post.userId,
              comment: post.comment,
              createdAt: post.createdAt,
            }}
          />
        ))}
    </>
  );
};
