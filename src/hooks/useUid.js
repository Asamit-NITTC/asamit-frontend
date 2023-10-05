import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";

export const useUid = (propsUid) => {
  const [uid, setUid] = useState("");
  const [idToken, setIdToken] = useState("");
  const [error, setError] = useState();
  const [{ isLoading }, doFetch] = useAxios();

  const fetchUid = async () => {
    try {
      const res = await doFetch({
        method: "get",
        url: "/users/inquiry-sub",
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      setUid(res.uid);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (propsUid) setUid(propsUid);
    if (!uid && idToken) {
      fetchUid();
    }
  }, [idToken]);

  // setIdTokenをトリガーにuidをフェッチ
  return [{ uid, error, isLoading }, setIdToken];
};
