import { useContext, useEffect, useState } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";

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
  const { liffObject } = useContext(LiffObjectContext);

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
      });
      const dt = new Date(res.targetTime);
      const h = dt.getHours().toString().padStart(2, "0");
      const m = dt.getMinutes().toString().padStart(2, "0");
      setTargetTime(h + ":" + m);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAll = async () => {
    await Promise.all([fetchData(), fetchDate()]);
  };

  const putData = async (bodyObj) => {
    //{ "key": "value"}
    const idToken = liffObject?.getIDToken();
    bodyObj.uid = uid;
    try {
      const res = await doFetch({
        method: "put",
        url: `/users/update_profile`,
        body: JSON.stringify(bodyObj),
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      console.log("updated: " + JSON.stringify(res));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!uid) return;
    fetchAll();
  }, [uid, liffObject]);

  return [{ userInfo, summitStatus, targetTime, isLoading }, putData];
};
