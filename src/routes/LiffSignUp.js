import React, { useState, useEffect, useContext } from "react";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useAxios } from "../hooks/useAxios";
import { RegisterName } from "../components/RegisterName";
import { LiffObjectContext } from "../components/LiffObjectProvider";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSignUp = () => {
  const [log, setLog] = useState("");
  const { liffObject, isLoggedIn, isInClient } = useContext(LiffObjectContext);
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const [{ isLoading }, doFetch] = useAxios();

  const register = async (name) => {
    localStorage.removeItem("uid");
    const idToken = liffObject?.getIDToken();
    try {
      const res = await doFetch({
        method: "post",
        url: "/users/signup",
        body: JSON.stringify({ name: name }),
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      setLog("signup success " + JSON.stringify(res));
      const uid = res.uid;
      localStorage.setItem("uid", uid);
      sendMessages(`登録完了\nID: ${uid}`);
    } catch (err) {
      setLog("signup failed " + JSON.stringify(err));
      if (err.response.status === 500) {
        sendMessages("登録済みです");
      } else {
        sendMessages("登録に失敗しました");
      }
    } finally {
      liffObject?.closeWindow();
    }
  };

  useEffect(() => {
    if (Object.keys(liffObject).length === 0) return;
  }, [liffObject]);

  if (!isInClient && !DEBUG) {
    return <h1>不正な遷移です</h1>;
  } else {
    return (
      <>
        <main>
          {DEBUG && <p>{log}</p>}
          {DEBUG && isLoading && <p>Loading</p>}
          <RegisterName register={register} />
        </main>
      </>
    );
  }
};
