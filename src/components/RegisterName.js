import React from "react";
import { Button } from "../ui/Button";
import { Block } from "../ui/Block";
//import { useAxios } from "../hooks/useAxios";
import { useFormData } from "../hooks/useFormData";
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const RegisterName = ({ register }) => {
  //const [{ isLoading }, doFetch] = useAxios();
  //const [log, setLog] = useState("");
  //const [error, setError] = useState("");
  //const [idToken] = useState("");

  const [name, setName] = useFormData("");
  return (
    <>
      <Block>
        <h2>ハンドルネーム(表示名)を登録</h2>
        <div>
          <input type="text" name="memberUID" onChange={setName} value={name} />
          <Button type="summit" onClick={() => register(name)}>
            登録する！
          </Button>
        </div>
      </Block>
    </>
  );
};
