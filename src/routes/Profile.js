import React, { useContext, useState } from "react";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { Button } from "../ui/Button";
import { Navigate } from "react-router-dom";
import { LiffObjectContext } from "../components/LiffObjectProvider";
import { UserInfoContext } from "../components/UserInfoProvider";
import { ProfileCard } from "../ui/ProfileCard";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const Profile = () => {
  const { liffObject, isLoggedIn, logout } = useContext(LiffObjectContext);
  const { userInfo } = useContext(UserInfoContext);
  const { pictureUrl } = useLiffInfo(liffObject, isLoggedIn);
  const [loggedOut, setLoggedOut] = useState(false);
  const logoutBtn = () => {
    logout();
    setLoggedOut(true);
  };

  return (
    <WebAppWrapper title="実績">
      <ProfileCard pictureUrl={pictureUrl} userInfo={userInfo} />
      <Button onClick={logoutBtn} className="default-margin">
        ログアウト
      </Button>
      {loggedOut && <Navigate replace to="/app/home" />}
    </WebAppWrapper>
  );
};
