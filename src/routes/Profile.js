import React, { useContext, useState } from "react";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { Button } from "../ui/Button";
import { Navigate } from "react-router-dom";
import { LiffObjectContext } from "../components/LiffObjectProvider";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const Profile = () => {
  const { liffObject, isLoggedIn, logout } = useContext(LiffObjectContext);
  const { displayName, pictureUrl } = useLiffInfo(liffObject, isLoggedIn);
  const [loggedOut, setLoggedOut] = useState(false);
  const logoutBtn = () => {
    logout();
    setLoggedOut(true);
  };

  return (
    <WebAppWrapper title="実績">
      <img src={pictureUrl} alt="アイコン画像" />
      <h2>こんにちは！{displayName}さん！</h2>
      <p>累計ポイント: 0pt</p>
      <p>連続起床日数: 0日</p>
      <Button onClick={logoutBtn}>ログアウト</Button>
      {loggedOut && <Navigate replace to="/app/home" />}
    </WebAppWrapper>
  );
};
