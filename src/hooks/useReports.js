import { useEffect, useState, useContext } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";
//import { useUidInfo } from "./useUidInfo";

export const useReports = () => {
  const [roomPosts, setRoomPosts] = useState([
    {
      userId: "",
      comment: "",
      createdAt: "",
    },
  ]);
  const { liffObject } = useContext(LiffObjectContext);
  const [, doFetch] = useAxios();
  //const { userInfo } = useUidInfo()

  const fetchData = async () => {
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "get",
        url: `/wake/get-all-report/no-uid`,
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      const convertedPostData = res.map((post) => {
        /*
 jljlji       try {
          const res = await doFetch({
            method: "get", url: `/users/${post.uid}`
          });
          var name = res.name;
        } catch (err) {
          console.log(err)
        };
        */
        return {
          userId: post.uid,
          comment: post.comment,
          createdAt: post.CreatedAt,
        };
      });
      console.log(convertedPostData);
      setRoomPosts(convertedPostData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Object.keys(liffObject).length !== 0) {
      fetchData();
    }
  }, [liffObject]);

  return { roomPosts };
};
