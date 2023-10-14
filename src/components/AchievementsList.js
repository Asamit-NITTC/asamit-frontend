import React from "react";
import { AchievementCard } from "../ui/AchievementCard";
import { useAchievements } from "../hooks/useAchievements";

export const AchievementsList = ({ uid }) => {
  const { achievementData } = useAchievements(uid);

  return (
    <>
      {achievementData[0] !== "" &&
        achievementData.map((achievement) => (
          <AchievementCard
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
