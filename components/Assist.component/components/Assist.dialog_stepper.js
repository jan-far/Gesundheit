import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  root: {
    width: "500px",
    height: "300px",
    margin: 0,
    padding: 0,
    fontFamily: "Comfortaa, cursive",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "300px",
    },
  },
  button: {
    marginRight: theme.spacing(1),
    fontSize: 11,
    fontFamily: "Comfortaa, cursive",
  },
  body: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: 200,
    fontFamily: "Comfortaa, cursive",

    [theme.breakpoints.down("sm")]: {
      height: 260,
    },
  },
  finalBody: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    fontFamily: "Comfortaa, cursive",
  },
  btns: {
    padding: "0 30px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 20px",
    },
  },
  instructions: {
    flex: 2,
    padding: "10px 30px",

    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px",
    },
  },
}));

function StepperComp({ checked, setChecked, user }) {
  const classes = useStyles();
  const fullname = Object.keys(user).length
    ? `Hi ${user.fullname.split(" ")[0]}!`
    : "Greetings!";
  const matches = useMediaQuery("(min-width:600px)");

  const texts = {
    one: (
      <>
        <div style={{ marginBottom: -10, marginTop: matches ? 0 : -30 }}>
          {fullname}
        </div>{" "}
        <br />
        Thank you for agreeing to take part in this brief interview about
        alcohol, tobacco products and other drugs. I am going to ask you some
        questions about your experience of using these substances across your
        lifetime and in the past three months. These substances can be smoked,
        swallowed, snorted, inhaled, injected or taken in the form of pills
        (show drug card).
      </>
    ),
    two: `Some of the substances listed may be prescribed by a doctor
  (like amphetamines, sedatives, pain medications),
  we will not record medications that are used as prescribed for this interview.`,
    three: `However, if you have taken such medications for reasons other
  than prescription, or taken them more frequently or at higher doses
  than prescribed, please let me know. While we are also interested in
  knowing about your use of various illicit drugs, please be assured
  that information on such use will be treated as strictly confidential.`,
  };

  function getSteps() {
    return ["", "", ""];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return texts.one;
      case 1:
        return texts.two;
      case 2:
        return texts.three;
      default:
        return "Unknown step";
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.finalBody}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleReset}
              variant="outlined"
              size="small"
              className={classes.button}
            >
              Previous
            </Button>
            <FormControlLabel
              style={{ paddingTop: 40 }}
              label={
                <b style={{ fontFamily: "Comfortaa, cursive" }}>
                  I have carefully read the above instructions
                </b>
              }
              control={
                <Checkbox
                  value="remember"
                  color="secondary"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
            />
          </div>
        ) : (
          <div className={classes.body}>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div className={classes.btns}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                variant="outlined"
                size="small"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                variant="outlined"
                size="small"
                endIcon={
                  activeStep === steps.length - 1 ? (
                    <> </>
                  ) : (
                    <ArrowForwardIcon />
                  )
                }
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapPropsToComponent = store => ({
  user: store.auth.user,
});

export default connect(mapPropsToComponent)(StepperComp);
