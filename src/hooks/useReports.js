import { useEffect, useState, useContext } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";

export const useReports = () => {
  const [roomPosts, setRoomPosts] = useState([
    {
      userId: "",
      comment: "",
      createdAt: "",
    },
  ]);
  const [nameFromUid, setNameFromUid] = useState({ uid: "name" });
  const { liffObject } = useContext(LiffObjectContext);
  const [, doFetch] = useAxios();

  const fetchData = async () => {
    const idToken = liffObject?.getIDToken();
    const nameToUid = {};
    try {
      const res = await doFetch({
        method: "get",
        url: `/wake/get-all-report/no-uid`,
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      const convertedPostData = res.reverse().map((post) => {
        nameToUid[post.uid] = "";
        const dt = new Date(post.CreatedAt);
        return {
          userId: post.uid,
          comment: post.comment,
          createdAt: dt.toDateString(),
        };
      });
      console.log(convertedPostData);
      setRoomPosts(convertedPostData);
      console.log(nameToUid);
      setNameFromUid(nameToUid);
      fetchName(nameToUid);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchName = async (nameUid) => {
    const nameToUid = {};
    console.log("fetchName");
    for (let k of Object.keys(nameUid)) {
      const res = await doFetch({
        method: "get",
        url: `/users/${k}`,
      });
      if (res) {
        nameToUid[k] = res.name;
      }
    }
    console.log(nameToUid);
    setNameFromUid(nameToUid);
  };

  useEffect(() => {
    if (Object.keys(liffObject).length !== 0) {
      fetchData();
    }
  }, [liffObject]);

  return { roomPosts, nameFromUid };
};
