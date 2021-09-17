import React from "react";
import dynamic from "next/dynamic";
import { FullScreenLoader } from "../components/general/IsLoading";

const Consult = dynamic(() => import("../components/Consult.component"), {
  loading: () => <FullScreenLoader />,
});

const request_consult = () => {
  return (
    <div>
      <Consult />
    </div>
  );
};

export default request_consult;
