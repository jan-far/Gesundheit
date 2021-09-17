import React from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import NavBar from "./components/Assist.navbar";
import styles from "./css/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "next/router";

const Index = (props) => {
  const {
    router: { back },
  } = props;
  return (
    <>
      <NavBar />
      <Head>
        <title>Corona | Assessment</title>
      </Head>
      <div className="root">
        <div className="item">
          <div className="img bg-a">
            <img src="/img/4.jpg" />
          </div>
          {/* <img src="/img/3.jpg"/> */}
          <div className="second">
            <Button color="primary" variant="contained" onClick={() => back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </>
  );
};

export default connect(null)(withRouter(Index));
