import React, { useContext } from "react";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { LiffObjectContext } from "../components/LiffObjectProvider";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { UserInfoContext } from "../components/UserInfoProvider";
//import { ProfileCard } from "../ui/ProfileCard";
import { SummitPending } from "../components/SummitPending";
import { StatusCard } from "../ui/StatusCard";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const Home = () => {
  const { liffObject, isLoggedIn } = useContext(LiffObjectContext);
  const { summitStatus, targetTime } = useContext(UserInfoContext);
  const { pictureUrl } = useLiffInfo(liffObject, isLoggedIn);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  return (
    <WebAppWrapper title="ホーム">
      <StatusCard
        currentDate={year + '年' + month + '月' + day + '日'}
        pictureUrl={pictureUrl}
        targetTime={targetTime} />
      {!summitStatus.affiliation && (
        <div className="default-margin">
          <SummitPending />
        </div>
      )}
    </WebAppWrapper>
  );
};
