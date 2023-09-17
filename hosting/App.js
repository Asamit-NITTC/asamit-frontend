import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { Liff } from "./routes/Liff";
import { LiffTest } from "./routes/LiffTest";
import { Profile } from "./routes/Profile";
import { NotFound } from "./routes/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liff" element={<Liff />} />
        <Route path="/liff-test" element={<LiffTest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
