import React, { useState } from "react";
import { useLiff } from "./hooks/useLiff";

export const IdToken = () => {
  const [idToken, setIdToken] = useState("");
  const { liffObject, isLoggedIn, login, logout } = useLiff();

  const fetchIdToken = () => {
    const token = liffObject.getIDToken();
    setIdToken(token);
  }

  return (
    <div className="main">
      {!isLoggedIn && <button onClick={login}>ログイン</button>}
      {isLoggedIn && <button onClick={logout}>ログアウト</button>}
      <h2>IDtoken Generator</h2>
      <button onClick={fetchIdToken}>IDtoken生成</button>
      <p>{ idToken }</p>
    </div>
  );
};
