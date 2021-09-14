import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import AuthWrapper from "../components/HOC/AuthWrapper";
import { FullScreenLoader } from "../components/general/IsLoading";

const Register = dynamic(() => import("../components/Register.component"), {
  loading: () => <FullScreenLoader />,
});

function Index() {
  return (
    <>
      <Head>
        <title>HealthLance | Sign up</title>
      </Head>
      <Register />
    </>
  );
}

export default AuthWrapper(Index, "/profile", "public");
