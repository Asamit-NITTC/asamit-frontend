import { useEffect, useState } from "react";
import liff from "@line/liff/core";
import IsLoggedIn from "@line/liff/is-logged-in"
import Login from "@line/liff/login"
import Logout from "@line/liff/logout"
liff.use(new IsLoggedIn());
liff.use(new Login());
liff.use(new Logout());

export const useLiff = () => {
  const [liffObject, setLiffObject] = useState({});
  const [isInited, setIsInited] = useState(false);

  const login = () => {
    liffObject?.login();
  }

  const logout = () => {
    liffObject?.logout();
  }

  useEffect(() => {
    if (isInited) return
    (async() => {
      try {
        await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
        setLiffObject(liff);
        if (liff.isLoggedIn()) setIsInited(true);
      } catch(err) {
        console.error({err});
      }
    })()
  }, [])

  return {
    liffObject,
    isInited,
    login,
    logout
  }
}
