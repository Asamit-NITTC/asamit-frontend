import { useState, useEffect, useContext } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";
const localStorageUid = localStorage.getItem("uid");

export const useUid = () => {
  const [uid, setUid] = useState(localStorageUid);
  const { liffObject } = useContext(LiffObjectContext);
  const [error, setError] = useState();
  const [{ isLoading }, doFetch] = useAxios();

  const fetchUid = async () => {
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "get",
        url: "/users/inquiry-sub",
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      setUid(res.uid);
      localStorage.setItem("uid", res.uid);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (!uid && Object.keys(liffObject).length !== 0) {
      fetchUid();
    }
  }, [liffObject]);

  // setIdTokenをトリガーにuidをフェッチ
  return { uid, error, isLoading };
};
