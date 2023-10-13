import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useAchievements = (uid) => {
  const [achievementData, setAchievementData] = useState([
    {
      date: "",
      time: "",
      comment: "",
    },
  ]);
  const [, doFetch] = useAxios();

  const fetchData = async () => {
    try {
      const res = await doFetch({
        method: "get",
        url: `/wake/get-all-report?uid=${uid}`,
      });
      const convertedAchievementData = res.map((achievement) => {
        const dt = new Date(achievement.WakeUpTime);
        const time = dt.getHours() + ":" + dt.getMinutes();
        const date =
          dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDay();
        return {
          date: date,
          time: time,
          comment: achievement.comment,
        };
      });
      console.log(convertedAchievementData);
      setAchievementData(convertedAchievementData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchData();
    }
  }, [uid]);

  return { achievementData };
};
