import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import { FullScreenLoader } from "../components/general/IsLoading";

const style = {
  container: {
    border: "1px solid #6be6ab",
    borderRadius: "5px",
    margin: " 10px 100px",
    backgroundColor: "#fff",
    padding: "20px",
    fontFamily: '"Quicksand", sans-serif',
    fontWeight: 900,
    cursor: 'ponter'
  },
};

const assessment = () => {
  return (
    <>
      <Head>
        <title>Gesundheit | Assessment</title>
      </Head>
      <div>
        <Link href="/corona">
          <div style={style.container}>Corona Test</div>
        </Link>
        <Link href="/alcohol-substance-test">
          <div style={style.container}>ASSITS test</div>
        </Link>
      </div>
    </>
  );
};

export default assessment;
