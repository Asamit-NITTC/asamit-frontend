import { useEffect, useState } from "react";
import liff from "@line/liff/core";
import IsLoggedIn from "@line/liff/is-logged-in";
import Login from "@line/liff/login";
import Logout from "@line/liff/logout";
import GetIDToken from "@line/liff/get-id-token";
import GetProfile from "@line/liff/get-profile";
import SendMessages from "@line/liff/send-messages";
liff.use(new IsLoggedIn());
liff.use(new Login());
liff.use(new Logout());
liff.use(new GetIDToken());
liff.use(new GetProfile());
liff.use(new SendMessages());

export const useLiff = () => {
  const [liffObject, setLiffObject] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    liffObject?.login();
  };

  const logout = () => {
    liffObject?.logout();
  };

  useEffect(() => {
    if (isLoggedIn) return;
    (async () => {
      try {
        console.log("initialize");
        await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
        setLiffObject(liff);
        if (liff.isLoggedIn()) setIsLoggedIn(true);
      } catch (err) {
        console.error({ err });
      }
    })();
  }, []);

  return {
    liffObject,
    isLoggedIn,
    login,
    logout,
  };
};
