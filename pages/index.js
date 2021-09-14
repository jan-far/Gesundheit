import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { FullScreenLoader } from "../components/general/IsLoading";

const Home = dynamic(() => import("../components/Home.component"), {
  loading: () => <FullScreenLoader />,
});

function Index() {
  return (
    <>
      <Head>
        <title>Welcome | Homepage</title>
      </Head>
      <Home />
    </>
  );
}

export default Index;
