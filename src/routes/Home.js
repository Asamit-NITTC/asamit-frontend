import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>Asamit TOP</h1>
      <p>ルートページは説明を表示させたい</p>
      <Link href="/app/home">
        <Button>Asamitアプリはここから！</Button>
      </Link>
    </>
  );
};
