import { useContext, useEffect, useState } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";

export const useAchievements = (uid) => {
  const [achievementData, setAchievementData] = useState([
    {
      date: "",
      time: "",
      comment: "",
    },
  ]);
  const { liffObject } = useContext(LiffObjectContext);
  const [, doFetch] = useAxios();

  const fetchData = async () => {
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "get",
        url: `/wake/get-all-report?uid=${uid}`,
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      const convertedAchievementData = res.map((achievement) => {
        const dt = new Date(achievement.WakeUpTime);
        const time = dt.getHours() + ":" + dt.getMinutes();
        const date =
          dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
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
