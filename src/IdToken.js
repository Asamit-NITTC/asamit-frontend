import React, { useContext, useState } from "react";
import { LiffObjectContext } from "./components/LiffObjectProvider";

export const IdToken = () => {
  const [idToken, setIdToken] = useState("");
  const { liffObject, isLoggedIn, login, logout } = useContext(LiffObjectContext);

  const fetchIdToken = () => {
    const token = liffObject?.getIDToken();
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
