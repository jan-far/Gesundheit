import React from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import NavBar from "./components/Assist.navbar";
import styles from "./css/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "next/router";

const Index = props => {
  const {
    router: { query },
  } = props;

  const from = query?.from ? `/${query?.from}` : "/";

  const toAlcohol =
    from === "/profile"
      ? `/alcohol-substance-test?from=profile`
      : "/alcohol-substance-test";
  const torequest_consult =
    from === "/profile" ? `/request_consult?from=profile` : "/request_consult";

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
          <div className="second" style={{ background: "#f0f0f0" }}>
            <Link href={torequest_consult}>
              <Button
                style={{ textTransform: "none" }}
                color="primary"
                variant="contained"
              >
                Associated with Depression and PTSD
              </Button>
            </Link>
          </div>
        </div>

        <div className="item">
          <div className="img bg-b">
            <img src="/img/2.jpg" />
          </div>
          <div className="second">
            <Link href={toAlcohol}>
              <Button
                style={{ textTransform: "none" }}
                color="primary"
                variant="contained"
              >
                Associated with Alcohol, Tobacco products and other drugs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="back">
        <Link href={from}>
          <Button color="primary" variant="contained">
            Back
          </Button>
        </Link>
      </div>

      <style jsx>{styles}</style>
    </>
  );
};

export default connect(null)(withRouter(Index));

const _axs = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};

const SingleQuestion = ({ q, n, setmodule_questions_set }) => {
  const classes = useStyles();
  return (
    <div className="q_body">
      <div className="q_1">
        <small>Question {n}</small>
        <span> {q.question}</span>
      </div>

      {q.options &&
        q.options.map((x, y) => (
          <div
            className={q.selectedAnswer !== x ? "q_2" : "q_2 q_2_x"}
            key={y + 1}
            onClick={() => {
              setmodule_questions_set(z => {
                return {
                  ...z,
                  [q._id]: {
                    ...q,
                    selectedAnswer: x,
                  },
                };
              });
            }}
          >
            <Avatar
              className={
                q.selectedAnswer === x ? classes.active : classes.normal
              }
            >
              {_axs[y + 1]}
            </Avatar>

            <span>{x}</span>
          </div>
        ))}

      <style jsx>{styles}</style>
    </div>
  );
};
