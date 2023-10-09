import { useEffect, useState, useContext } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";

export const useSummitRoomInfo = (roomId) => {
  const [roomInfo, setRoomInfo] = useState({
    roomId: "",
    wakeUpTime: "",
    description: "",
  });
  const { liffObject } = useContext(LiffObjectContext);
  const [, doFetch] = useAxios();

  const fetchData = async () => {
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "get",
        url: `/summit/room-detail-info?roomID=${roomId}`,
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      setRoomInfo({
        roomId: res.RoomID,
        wakeUpTime: res.WakeUpTime,
        description: res.Description,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (roomId && Object.keys(liffObject).length !== 0) {
      fetchData();
    }
  }, [roomId, liffObject]);

  return { roomInfo };
};
