import React from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { Button } from "../ui/Button";

export const LiffLightProfile = () => {
  const { liffObject, isLoggedIn } = useLiff();
  const { displayName, pictureUrl } = useLiffInfo(liffObject, isLoggedIn);
  const openAsamitApp = () => {
    liffObject?.openWindow({
      url: "https://asamit.web.app/app/home",
      external: true,
    });
  };

  return (
    <main>
      <img src={pictureUrl} alt="アイコン画像" />
      <h2>こんにちは！{displayName}さん！</h2>
      <p>累計ポイント: 0pt</p>
      <p>連続起床日数: 0日</p>
      <h2>Asamit!アプリを使うと通知を受け取ることができます！</h2>
      <Button onClick={openAsamitApp}>Asamit!アプリを開く</Button>
    </main>
  );
};
