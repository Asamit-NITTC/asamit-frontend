import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

export const Top = () => {
  return (
    <>
      <h1>Asamit TOP</h1>
      <p>ルートページは説明を表示させたい</p>
      <Link to="/app/home">
        <Button>Asamitアプリはここから！</Button>
      </Link>
    </>
  );
};