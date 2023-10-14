import React, { useContext, useState } from "react";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { Button } from "../ui/Button";
import { Navigate } from "react-router-dom";
import { useUid } from "../hooks/useUid";
import { LiffObjectContext } from "../components/LiffObjectProvider";
import { UserInfoContext } from "../components/UserInfoProvider";
import { ProfileCard } from "../ui/ProfileCard";
import { AchievementsList } from "../components/AchievementsList";

export const Profile = () => {
  const { liffObject, isLoggedIn, logout } = useContext(LiffObjectContext);
  const { uid } = useUid();
  const [{ userInfo }] = useContext(UserInfoContext);
  const { pictureUrl } = useLiffInfo(liffObject, isLoggedIn);
  const [loggedOut, setLoggedOut] = useState(false);
  const logoutBtn = () => {
    logout();
    setLoggedOut(true);
  };

  return (
    <WebAppWrapper title="実績">
      <ProfileCard pictureUrl={pictureUrl} userInfo={userInfo} />
      <AchievementsList uid={uid} />
      <Button onClick={logoutBtn} className="default-margin">
        ログアウト
      </Button>
      {loggedOut && <Navigate replace to="/app/home" />}
    </WebAppWrapper>
  );
};
