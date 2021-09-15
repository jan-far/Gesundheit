import React from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import NavBar from "./components/Assist.navbar";
import styles from "./css/styles";
import Button from "@material-ui/core/Button";

const Index = props => {
  return (
    <>
      <NavBar />
      <Head>
        <title>Gesundheit | Assessment</title>
      </Head>
      <div className="root">
        <div className="item">
          <div className="img bg-a">
            <img src="/img/1.jpg" />
          </div>
          {/* <img src="/img/3.jpg"/> */}
          <div className="second">
            <Link href="/corona">
              <Button color="primary" variant="contained">
                Corona Test
              </Button>
            </Link>
          </div>
        </div>
        <div className="item">
          <div className="img bg-b">
            <img src="/img/2.jpg" />
          </div>
          <div className="second">
            <Link href="/alcohol-substance-test">
              <Button color="primary" variant="contained">
                ASSIST Test
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </>
  );
};

export default connect(null)(Index);
