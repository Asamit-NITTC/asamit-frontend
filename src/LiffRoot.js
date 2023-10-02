import React from "react";
import { useLiff } from "./hooks/useLiff";

export const LiffRoot = () => {
  const { isLoggedIn, login, logout } = useLiff();

  return (
    <>
      {!isLoggedIn && <button onClick={login}>ログイン</button>}
      {isLoggedIn && <button onClick={logout}>ログアウト</button>}
      {isLoggedIn && <p>isInited</p>}
      {/*!isInClient && <h1>This app is only available on LIFF browser</h1>*/}
    </>
  )
}
