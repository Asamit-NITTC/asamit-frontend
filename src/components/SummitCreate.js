import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Block } from "../ui/Block";
import { useAxios } from "../hooks/useAxios";
import { useFormData } from "../hooks/useFormData";
import { useUid } from "../hooks/useUid";
import { LiffObjectContext } from "./LiffObjectProvider";
import styles from "./SummitCreate.module.css";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const SummitCreate = ({ setPending }) => {
  const [{ isLoading }, doFetch] = useAxios();
  const [formData, setFormData] = useState({});
  const { liffObject } = useContext(LiffObjectContext);
  const { uid } = useUid();
  const [log, setLog] = useState("");
  const [error, setError] = useState("");

  const [formUid, setFormUid] = useFormData("");
  const [formTime, setFormTime] = useFormData("06:00");
  const [formDescription, setFormDescription] = useFormData("");

  const setAll = () => {
    setFormData({
      hostUID: uid,
      memberUID: [formUid],
      wakeUpTime: `2023-06-27T${formTime}:00+9:00`,
      description: formDescription,
    });
  };

  const createGroup = async () => {
    const idToken = liffObject?.getIDToken();
    console.log(formData);
    try {
      const res = await doFetch({
        method: "post",
        url: "/summit/create",
        body: JSON.stringify(formData),
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      setError("グループが作成できました！");
      setLog("created " + JSON.stringify(res.data));
    } catch (err) {
      setLog("failed to create group " + JSON.stringify(err));
      setError("グループを作成できませんでした");
    }
  };

  useEffect(() => {
    if (Object.keys(formData).length === 0) return;
    createGroup();
  }, [formData]);

  return (
    <>
      <Block>
        <div className={styles.content}>
          <h2>グループを作成</h2>
          <div>
            <form>
              <div>
                <p>グループメイトのID</p>
                <input
                  type="text"
                  name="memberUID"
                  onChange={setFormUid}
                  value={formUid}
                />
              </div>
              <div>
                <p>グループの起床時刻</p>
                <input
                  type="time"
                  name="wakeUpTime"
                  onChange={setFormTime}
                  value={formTime}
                />
              </div>
              <div>
                <p>グループの説明</p>
                <input
                  type="text"
                  name="description"
                  onChange={setFormDescription}
                  value={formDescription}
                />
              </div>
            </form>
            <Button className={styles.btn} type="summit" onClick={setAll}>
              作成
            </Button>
          </div>
          {DEBUG && <p>{log}</p>}
          {DEBUG && isLoading && <p>Loading</p>}
          {error && (
            <p>
              <code>{error}</code>
            </p>
          )}
        </div>
      </Block>
      <Button
        className={styles.btn}
        type="summit"
        onClick={setPending}
        visual="secondary"
      >
        戻る
      </Button>
    </>
  );
};
