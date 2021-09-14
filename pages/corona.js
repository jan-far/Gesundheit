import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import { FullScreenLoader } from "../components/general/IsLoading";

const Corona = dynamic(() => import("../components/Corona.component"), {
  loading: () => <FullScreenLoader />,
});

const corona = () => {
  return (
    <div>
      <Corona />
    </div>
  )
}

export default corona
