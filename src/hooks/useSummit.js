import { useState, useEffect, useContext } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";
import { useUid } from "./useUid";
const localStorageRoomId = localStorage.getItem("roomId");

export const useSummit = () => {
  const { uid } = useUid();
  const { liffObject } = useContext(LiffObjectContext);
  const [roomId, setRoomId] = useState(localStorageRoomId);
  const [error, setError] = useState();
  const [{ isLoading }, doFetch] = useAxios();

  const fetchRoomId = async () => {
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "get",
        url: `/summit/room-affiliation-status?uid=${uid}`,
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      localStorage.setItem("roomId", res.roomID);
      setRoomId(res.roomID);
    } catch (err) {
      setError(err);
    }
  };

  const approve = async () => {
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "patch",
        url: `/summit/approve?uid=${uid}`,
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      console.log("approved" + JSON.stringify(res));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (uid && !roomId && Object.keys(liffObject).length !== 0) {
      fetchRoomId();
    }
  }, [liffObject, uid]);

  // setIdTokenをトリガーにuidをフェッチ
  return [{ roomId, error, isLoading }, approve];
};
