import React, { useContext } from "react";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { UserInfoContext } from "../components/UserInfoProvider";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const Home = () => {
  const { userInfo, summitStatus } = useContext(UserInfoContext);
  return (
    <WebAppWrapper title="ホーム">
      <div>
        <p>ユーザ：{userInfo.name}</p>
        <p>ポイント：{userInfo.point}</p>
        <p>承認待ち：{summitStatus.affiliation}</p>
      </div>
    </WebAppWrapper>
  );
};
