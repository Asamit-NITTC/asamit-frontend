import React from "react";
import { Post } from "../ui/Post";
import { useAchievements } from "../hooks/useAchievements";

export const AchievementsList = ({ uid }) => {
  const { achievementData } = useAchievements(uid);

  return (
    <>
      {achievementData[0] !== "" &&
        achievementData.map((achievement) => (
          <Post
            key=""
            content={{
              name: achievement.date,
              comment: achievement.comment,
              createdAt: achievement.time,
            }}
          />
        ))}
    </>
  );
};
