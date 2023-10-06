import React from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Top } from "./routes/Top";
import { Home } from "./routes/Home";
import { Summit } from "./routes/Summit";
import { Profile } from "./routes/Profile";

import { LiffRoot } from "./LiffRoot";
import { LiffLightProfile } from "./routes/LiffLightProfile";
import { LiffWakeUp } from "./routes/LiffWakeUp";
import { LiffSignUp } from "./routes/LiffSignUp";
import { LiffSetTime } from "./routes/LiffSetTime";
import { LiffFeedback } from "./routes/LiffFeedback";

import { IdToken } from "./IdToken";
import { NotFound } from "./routes/NotFound";

const DEBUG = process.env.DEBUG==="TRUE" ? true : false;
if (DEBUG) console.log("debug mode");

const App = () => {
  const [cookies, setCookie] = useCookies(["uid"]);
  const setCookieUid = (uid) => {
    setCookie("uid", uid);
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/idtoken" element={<IdToken />} />
        <Route path="/app/summit" element={<Summit />} />
        <Route path="/app/home" element={<Home />} />
        <Route path="/app/profile" element={<Profile />} />

        <Route path="/app" element={<LiffRoot />} />
        <Route path="/app/main" element={<LiffLightProfile />} />
        <Route path="/app/wakeup" element={<LiffWakeUp uid={cookies.uid} setCookieUid={setCookieUid} />} />
        <Route path="/app/signup" element={<LiffSignUp setCookieUid={setCookieUid} />} />
        <Route path="/app/setTime" element={<LiffSetTime uid={cookies.uid} setCookieUid={setCookieUid} />} />
        <Route path="/app/feedback" element={<LiffFeedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      { DEBUG && <p>current_uid: { cookies.uid }</p> }
    </div>
  );
};

export default App;
