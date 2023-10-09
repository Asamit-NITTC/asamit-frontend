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

  useEffect(() => {
    if (!uid) return;
    fetchData();
  }, [uid]);

  return { userInfo, summitStatus, isLoading };
};
