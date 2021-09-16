import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// import CardActions from "@material-ui/core/CardActions";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";
import Styles from "../css/home.about_us.module.css";

import ThirdBodyStepper from "./Stepper.component_2";

const steps = [
  {
    id: 1,
    key: "01",
    body: (
      <>
        {" "}
        Gesundheit Online Test is designed to determne an individuals level of
        alcohol, drug and(or) substance use and the risks associated with such
        use. 8 questions (questionnaire format) are asked and all data provided
        are treated with strict confidentiality. Afer completing all questions,
        the resulting scores are used to calculate the risk levels associated
        with each drug and(or) substance you have used. A detailed feedback
        report will be provided which can help you explore options for
        addressing those risks.
      </>
    ),
    title: "The Online Test",
  },

  {
    id: 2,
    key: "02",
    body: (
      <>
        Gesundheit Online Test is an adptation of the WHO ASSIST (Alcohol,
        Smoking and Substance Involvement Screening Test) Project. The ASSIST
        was designed to be culturally neutral and useable across a variety of
        cultures to screen for use of the following substances that fall into
        these categories: tobacco products alcohol cannabis cocaine
        amphetamine-type stimulants (ATS) sedatives and sleeping pills
        (benzodiazepines) hallucinogens inhalants opioids, including some common
        street names
        <br />
        For more information{" "}
        <a
          href="https://www.who.int/substance_abuse/activities/assist_test/en/"
          target="_blank"
        >
          click here
        </a>
      </>
    ),
    title: "Credits",
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    height: "inherit",
  },
  first: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "50px 120px",
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: 5,
      paddingTop: 30,
    },
  },
  header: {
    textAlign: "center",
  },
  subheader: {
    textAlign: "center",
    padding: "5px 140px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 30px",
      fontSize: 13,
    },
  },
  stepBodyWrapper: {
    display: "block",

    padding: "5px 150px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: "5px 10px",
    },
  },

  stepBody1: {
    flex: 1,
    color: "#44b700",
    fontSize: 25,
    fontWeight: 500,
    padding: "10px 100px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      textAlign: "center",
      padding: "5px 10px",
      fontWeight: 400,
    },
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);

  const onSelectActiveStep = id => {
    setActiveStep(id);
  };

  return (
    <div className={classes.root}>
      <div className={classes.first}>
        <div className={Styles.title}>About </div>

        <div className={Styles.subheader}>
          Gesundheit is a web application designed to help individuals cut down
          or stop the abuse of alcohol, drugs & addictive (psychoactive)
          substances
        </div>

        <ThirdBodyStepper
          activeStep={activeStep}
          onSelectActiveStep={onSelectActiveStep}
          steps={steps}
        />
      </div>

      <div className={classes.stepBodyWrapper}>
        <Zoom in={activeStep === 1} style={{ transitionDelay: "300ms" }}>
          <div style={{ width: "100%" }}>
            {activeStep === 1 && (
              <ActiveStepBody
                classes={classes}
                text={steps[1 - 1].body}
                step={1}
              />
            )}
          </div>
        </Zoom>

        <Zoom in={activeStep === 2} style={{ transitionDelay: "300ms" }}>
          <div style={{ width: "100%" }}>
            {activeStep === 2 && (
              <ActiveStepBody
                classes={classes}
                text={steps[2 - 1].body}
                step={2}
              />
            )}
          </div>
        </Zoom>
      </div>
    </div>
  );
}

const ActiveStepBody = ({ step, text }) => {
  return (
    <div
      className={step === 1 ? Styles.step_body_left : Styles.step_body_right}
    >
      <span>{text}</span>
    </div>
  );
};
