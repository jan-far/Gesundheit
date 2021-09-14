import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { FullScreenLoader } from "../general/IsLoading";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { animateScroll as scroll } from "react-scroll";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import LinearProgress from "@material-ui/core/LinearProgress";
import Styles from "./assist.question.module.css";

import { FirstComp, SecondComp, ThirdComp } from "./Semi_Component";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function myFunction(document, setProgress) {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;

  setProgress(parseInt(scrolled));
}

export default function DialogComponent({ handleClose, substances, answers }) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [results, setResults] = React.useState(null);

  const getResults = async () => {
    const setAnsers = { ...answers };
    delete setAnsers.name;
    delete setAnsers.date;

    console.log({ setAnsers });
    try {
      const res = await axios.post("/api/assist/assesment/calculate", {
        answers: setAnsers,
      });

      const { Q_8, getRiskLevels, SUB_J } = res.data;
      console.log({ data: res.data });
      setResults({ Q_8, getRiskLevels, SUB_J });
    } catch (e) {}
  };

  React.useEffect(() => {
    window.onscroll = function () {
      myFunction(document, setProgress);
    };
  }, []);

  React.useEffect(() => {
    if (!results) getResults();
  });
  console.log({ results, answers });
  if (!results || !answers) return <FullScreenLoader />;

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Feedback Report
          </Typography>

          <Button color="inherit" onClick={handleClose}>
            close
          </Button>
        </Toolbar>

        <LinearProgress
          variant="determinate"
          color="secondary"
          value={progress}
        />
      </AppBar>

      <div className={Styles.feedback_body}>
        <div>
          <div className={Styles.feedback_title}>
            {" "}
            What do your scores mean?
          </div>
          <FirstComp />
        </div>

        <div>
          <div className={Styles.feedback_title}>Your Risk Levels</div>
          <div className={Styles.feedback_title_direction}>
            any box below to expand more information
          </div>
          <SecondComp results={results} substances={substances} />
        </div>

        <div>
          {/* {results && results.Q_8.trim() && ( */}
          <div>
            <div className={Styles.feedback_title}>
              Risks associated with injecting drugs
            </div>
            <ThirdComp />
          </div>
          {/* )} */}
        </div>
      </div>

      <Fab
        color="secondary"
        size="small"
        aria-label="scroll back to top"
        onClick={() => scroll.scrollToTop()}
        style={{ float: "right", marginRight: 30, marginTop: -30, zIndex: 100 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
}
