import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { LiffRoot } from "./LiffRoot";

import { Liff } from "./routes/Liff";
import { LiffTest } from "./routes/LiffTest";
import { Profile } from "./routes/Profile";
import { NotFound } from "./routes/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liff/" element={<LiffRoot />} />
        <Route path="/liff/main" element={<Liff />} />
        <Route path="/liff/review" element={<LiffTest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
