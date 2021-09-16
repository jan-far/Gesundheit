import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import AuthWrapper from "../components/HOC/AuthWrapper";
import { FullScreenLoader } from "../components/general/IsLoading";

const Login = dynamic(() => import("../components/Login.component"), {
  loading: () => <FullScreenLoader />,
});

function Index() {
  return (
    <>
      <Head>
        <title>Gesundheit | Login</title>
      </Head>
      <Login />
    </>
  );
}

export default AuthWrapper(Index, "/profile", "public");
