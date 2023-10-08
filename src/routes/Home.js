import React, { useContext } from "react";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { LiffObjectContext } from "../components/LiffObjectProvider";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { UserInfoContext } from "../components/UserInfoProvider";
import { ProfileCard } from "../ui/ProfileCard";
import { SummitPending } from "../components/SummitPending";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const Home = () => {
  const { liffObject, isLoggedIn } = useContext(LiffObjectContext);
  const { userInfo, summitStatus } = useContext(UserInfoContext);
  const { pictureUrl } = useLiffInfo(liffObject, isLoggedIn);
  return (
    <WebAppWrapper title="ホーム">
      <ProfileCard pictureUrl={pictureUrl} userInfo={userInfo} />
      {!summitStatus.affiliation && (
        <div className="default-margin">
          <SummitPending />
        </div>
      )}
    </WebAppWrapper>
  );
};
