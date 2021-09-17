import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    backgroundColor: "green",
    "& $line": {
      backgroundColor: "green",
    },
  },
  completed: {
    backgroundColor: "green",
    "& $line": {
      backgroundColor: "green",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "green",
    borderRadius: 12,
  },
})(StepConnector);

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "0%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

function GetStepIcon(props) {
  const { icon, active } = props;

  const useColorlibStepIconStyles = makeStyles({
    avatar: {
      color: active ? "#1a941f" : "#fff",
      background: active ? "#fff" : "#1a941f",
      border: active ? "1px solid #1a941f" : "1px solid #fff",
      padding: 1,
      width: 30,
      height: 30,
      position: "relative",
    },
    activeSpan: {
      fontSize: 14,
    },
    span: {
      fontSize: 14,
      opacity: 0.2,
    },
    text: {
      position: "absolute",
      width: 200,
      top: -23,
      left: -30,
      fontWeight: 900,
      opacity: 0.3,
      fontFamily: "Assistant",
    },
    active: {
      position: "absolute",
      width: 200,
      top: -23,
      left: -30,
      fontWeight: 900,
      color: "green",
      fontFamily: "Assistant",
    },
  });

  const classes = useColorlibStepIconStyles();

  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      className={classes.badge}
      variant={active ? "dot" : "standard"}
    >
      <Avatar className={classes.avatar}>
        {icon === 1 && (
          <span className={active ? classes.activeSpan : classes.span}>1</span>
        )}
        {icon === 2 && (
          <span className={active ? classes.activeSpan : classes.span}>2</span>
        )}
      </Avatar>

      {icon === 1 && (
        <span className={active ? classes.active : classes.text}>
          Severity of depression
        </span>
      )}
      {icon === 2 && (
        <span className={active ? classes.active : classes.text}>
          Probable PTSD
        </span>
      )}
    </StyledBadge>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    userSelect: "none",
    outline: "none",
    outlineStyle: "none",
    padding: 20,
    background: "#fff",
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
  },
  step: {
    cursor: "inherit",
    userSelect: "none",
    outline: "none",
    outlineStyle: "none",
  },
}));

export default function HorizontalNonLinearStepper(props) {
  const classes = useStyles();
  const { activeStep, setview, steps } = props;

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map(item => (
          <Step
            key={item.id}
            connector={<ColorlibConnector />}
            style={{
              cursor:
                parseInt(activeStep) > parseInt(item.id)
                  ? "pointer"
                  : "pointer",
            }}
            onClick={() => {
              console.log({
                activeStep,
                od: item.id,
              });

              setview(item.id);
            }}
          >
            <StepLabel
              className={classes.step}
              active={activeStep === item.id}
              icon={item.id}
              StepIconComponent={GetStepIcon}
            />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
