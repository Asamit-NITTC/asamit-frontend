import { useEffect, useState, useContext } from "react";
import { useAxios } from "./useAxios";
import { LiffObjectContext } from "../components/LiffObjectProvider";

export const useRoomPost = (uid, roomId) => {
  const [roomPosts, setRoomPosts] = useState([
    {
      userId: "",
      comment: "",
      createdAt: "",
    },
  ]);
  const { liffObject } = useContext(LiffObjectContext);
  const [, doFetch] = useAxios();

  const fetchData = async () => {
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "get",
        url: `/summit/room-talk?room-id=${roomId}&uid=${uid}`,
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      //WARN DBのレスポンスに依存
      const postData = res.match(/\[[^\]]+\]/);
      console.log(postData);
      const postDataArray = JSON.parse(postData);
      console.log(postDataArray);
      const convertedPostData = postDataArray.map((post) => {
        return {
          userId: post.UserUID,
          comment: post.Comment,
          createdAt: post.CreatedAt,
          imageUrl: post.ImageURL,
        };
      });
      console.log(convertedPostData);
      setRoomPosts(convertedPostData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (uid && roomId && Object.keys(liffObject).length !== 0) {
      fetchData();
    }
  }, [uid, roomId, liffObject]);

  return { roomPosts };
};
