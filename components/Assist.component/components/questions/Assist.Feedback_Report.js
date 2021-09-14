import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";

import Button from "@material-ui/core/Button";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Styles from "../../css/assist.question.module.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import SnackBar from "../../../general/SnackBar";
import { animateScroll as scroll } from "react-scroll";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  FirstComp,
  SecondComp,
  ThirdComp,
} from "../sub_components/Feedback_Component";

import LinearProgress from "@material-ui/core/LinearProgress";
import Feedback_Save_dialog from "../sub_components/Feedback_save.dialog";

import AuthModal from "../../../ModalAuth.component";

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

const Index = props => {
  const { answers, user } = props;
  const { id } = user;

  const [results, setResults] = React.useState(null);
  const [substances, setSubstances] = React.useState(null);

  const [view, setView] = React.useState("first");

  const handleClickOpen = () => {
    setView("second");
  };

  const handleClose = () => {
    setView("first");
  };

  const getResults = async () => {
    try {
      console.log({ answers });
      const res = await axios.post("/api/assist/assesment/calculate", {
        answers,
      });

      const { Q_8, getRiskLevels, SUB_J } = res.data;
      console.log({ data: res.data });
      setResults({ Q_8, getRiskLevels, SUB_J });
      handleClickOpen();
    } catch (e) {}
  };

  const getSubstances = async () => {
    try {
      const res = await axios.get("/api/assist/substance/all");

      setSubstances(res.data);
      console.log(222222, res.data);
    } catch (e) {}
  };

  const onProceed = () => {};

  React.useEffect(() => {
    if (!substances) getSubstances();
  });

  if (view === "second")
    return (
      <DialogComponent
        handleClose={handleClose}
        results={results}
        substances={substances}
        answers={answers}
        id={id}
      />
    );
  return (
    <>
      <AssisQ_Nav qNumber={"REPORT"} onClick={() => onProceed()} />
      <div className={Styles.root_2}>
        <div className={Styles.question_head}>
          <h1>Feedback report</h1>
          <h3>Congratulaions You Have Completed The Questions Successfully!</h3>

          <Button
            color="primary"
            variant="contained"
            style={{ padding: 10 }}
            onClick={() => getResults()}
          >
            Click Here to Get Your Results
          </Button>
        </div>
      </div>
    </>
  );
};

const mapPropsToComponent = store => ({
  answers: store.assist.answers,
  user: store.auth.user,
});

export default connect(mapPropsToComponent)(Index);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function myFunction(document, setProgress) {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;

  setProgress(parseInt(scrolled));
}

const DialogComponent = ({ handleClose, results, substances, answers, id }) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [msg, setMsg] = React.useState("");

  // AUTH DIALOG PROPS
  const [openAuth, setOpenAuth] = React.useState(false);

  const handleClickOpenAuth = () => {
    setOpenAuth(true);
  };

  const handleCloseAuth = value => {
    setOpenAuth(false);
  };

  // DIALOG PROPS
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpen_dialog = () => {
    if (!id || !id.length) return setOpenAuth(true);

    setOpenD(true);
  };

  const handleClose_dialog = value => {
    setOpenD(false);
  };

  React.useEffect(() => {
    window.onscroll = function () {
      myFunction(document, setProgress);
    };
  }, []);

  return (
    <div>
      <AuthModal
        open={openAuth}
        handleClickOpen={handleClickOpenAuth}
        handleClose={handleCloseAuth}
      />

      {open && (
        <SnackBar
          handleClose={() => setOpen(false)}
          type={type}
          message={msg}
        />
      )}

      <Feedback_Save_dialog
        answers={answers}
        open={openD}
        handleClose={handleClose_dialog}
        id={id}
        setMsg={setMsg}
        setType={setType}
        setOpen={setOpen}
      />

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

          <Hidden only={["xs", "sm"]}>
            <Button
              color="inherit"
              color="secondary"
              variant="contained"
              onClick={() => handleClickOpen_dialog()}
            >
              save this result
            </Button>
          </Hidden>

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
      <Button
        color="inherit"
        color="secondary"
        variant="contained"
        onClick={() => handleClickOpen_dialog()}
        style={{ margin: 30 }}
      >
        save this result
      </Button>
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
};
