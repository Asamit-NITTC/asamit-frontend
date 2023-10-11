import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useUidInfo = (uid) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    point: null,
    duration: null,
  });
  const [summitStatus, setSummitStatus] = useState({
    invitation: false,
    affiliation: false,
  });
  const [targetTime, setTargetTime] = useState();
  const [{ isLoading }, doFetch] = useAxios();

  const fetchData = async () => {
    try {
      const res = await doFetch({
        method: "get",
        url: `/users/${uid}`,
      });
      setUserInfo({
        name: res.name,
        point: res.point,
        duration: res.duration,
      });
      setSummitStatus({
        invitation: res.InvitationStatus,
        affiliation: res.AffiliationStatus,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDate = async () => {
    try {
      const res = await doFetch({
        method: "get",
        url: `/target-time/get?uid=${uid}`,
        //headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      setTargetTime(res.targetTime);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAll = async () => {
    await Promise.all([fetchData(), fetchDate()]);
  };

  useEffect(() => {
    if (!uid) return;
    fetchAll();
  }, [uid]);

  return { userInfo, summitStatus, targetTime, isLoading };
};
