import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import AuthWrapper from "../components/HOC/AuthWrapper";
import { FullScreenLoader } from "../components/general/IsLoading";

const Profile = dynamic(() => import("../components/Profile.component"), {
  loading: () => <FullScreenLoader />,
});

function Index() {
  return (
    <>
      <Head>
        <title>Gesundheit | Profile</title>
      </Head>
      <Profile />
    </>
  );
}

export default AuthWrapper(Index, "/login", "private");
