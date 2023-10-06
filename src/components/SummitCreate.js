import React, { useEffect, useState } from "react";
import { useLiff } from "../hooks/useLiff";
import { Button } from "../ui/Button";
import { Block } from "../ui/Block";
import { useAxios } from "../hooks/useAxios";
import { useFormData } from "../hooks/useFormData";
//import { useZxing } from "react-zxing";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const SummitCreate = () => {
  const { liffObject } = useLiff();
  const [{ isLoading }, doFetch] = useAxios();
  const [formData, setFormData] = useState({});
  const [log, setLog] = useState("");
  const [error, setError] = useState("");
  const [idToken] = useState("");
  const [uid] = useState("");

  const [formUid, setFormUid] = useFormData("");
  const [formTime, setFormTime] = useFormData("");
  const [formDescription, setFormDescription] = useFormData("");

  const setAll = () => {
    setFormData({
      memberUID: [uid, formUid],
      wakeUpTime: formTime,
      description: formDescription,
    });
  };

  const handleScan = async () => {
    const scanResult = await liffObject?.scanCodeV2();
    const uid = scanResult.value;
    try {
      if (isNaN(Number(uid)) || !uid) throw "不正なQRコードです";
      setFormUid(uid);
    } catch (err) {
      setError(err);
    }
  };
  /*
  const {
    ref,
    torch: { on, off, isAvailable},
  } = useZxing({
    onDecodeResult(result) {
      setFormUid(result.getText());
      off();
    }
  });
  */

  const createGroup = async () => {
    console.log(formData);
    try {
      const res = await doFetch({
        method: "post",
        url: "/summit/create",
        body: JSON.stringify(formData),
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
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
        <h2>グループを作成</h2>
        <div>
          <form>
            <div>
              <label htmlFor="memberUID">グループメイトのID</label>
              <input
                type="text"
                name="memberUID"
                onChange={setFormUid}
                value={formUid}
              />
            </div>
            {
              <Button type="summit" onClick={handleScan}>
                QRコードから追加
              </Button>
            }
            <div>
              <label htmlFor="wakeUpTime">グループの起床時刻</label>
              <input
                type="text"
                name="wakeUpTime"
                onChange={setFormTime}
                value={formTime}
              />
            </div>
            <div>
              <label htmlFor="description">グループの説明</label>
              <input
                type="text"
                name="description"
                onChange={setFormDescription}
                value={formDescription}
              />
            </div>
          </form>
          <Button type="summit" onClick={setAll}>
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
      </Block>
      {/*
      <div>
        <video ref={ref} />
      </div>
      */}
    </>
  );
};
