import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { FullScreenLoader } from "../components/general/IsLoading";

const Home = dynamic(() => import("../components/ModalAuth.component"), {
  loading: () => <FullScreenLoader />,
});

function Index() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Welcome | Homepage</title>
      </Head>
      <Home
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </>
  );
}

export default Index;
