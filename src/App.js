import React from "react";
import { Routes, Route } from "react-router-dom";

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
        <Route path="/app/wakeup" element={<LiffWakeUp />} />
        <Route path="/app/signup" element={<LiffSignUp />} />
        <Route path="/app/setTime" element={<LiffSetTime />} />
        <Route path="/app/feedback" element={<LiffFeedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
