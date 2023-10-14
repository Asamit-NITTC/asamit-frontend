import React, { useContext } from "react";
import { LiffObjectContext } from "../components/LiffObjectProvider";
import { UserInfoContext } from "../components/UserInfoProvider";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { Button } from "../ui/Button";
import { ProfileCard } from "../ui/ProfileCard";

export const LiffLightProfile = () => {
  const { liffObject, isLoggedIn, isInClient } = useContext(LiffObjectContext);
  const [{ userInfo }] = useContext(UserInfoContext);
  const { pictureUrl } = useLiffInfo(liffObject, isLoggedIn);
  const openAsamitApp = () => {
    liffObject?.openWindow({
      url: "https://asamit.web.app/app/home",
      external: true,
    });
  };

  return (
    <>
      {!isInClient && <h1>不正な遷移です</h1>}
      {isInClient && (
        <main>
          <ProfileCard pictureUrl={pictureUrl} userInfo={userInfo} />

          <h4>Asamit!アプリを使うと通知を受け取ることができます！</h4>
          <Button onClick={openAsamitApp}>Asamit!アプリを開く</Button>
        </main>
      )}
    </>
  );
};
