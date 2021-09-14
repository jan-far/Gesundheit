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
    backgroundColor: "#bc1c7d",
    "& $line": {
      backgroundColor: "#bc1c7d",
    },
  },
  completed: {
    backgroundColor: "#bc1c7d",
    "& $line": {
      backgroundColor: "#bc1c7d",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#bc1c7d",
    borderRadius: 12,
  },
})(StepConnector);

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "##bc1c7d",
    color: "##bc1c7d",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
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
      color: active ? "#bc1c7d" : "#fff",
      background: active ? "#fff" : "#bc1c7d",
      border: active ? "1px solid #bc1c7d" : "1px solid #fff",
      padding: 30,
    },
    span: {
      fontSize: 14,
    },
    badge: {},
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
        {icon === 1 && <span className={classes.span}> 01 </span>}
        {icon === 2 && <span className={classes.span}> 02 </span>}
        {icon === 3 && <span className={classes.span}> 03 </span>}
        {icon === 4 && <span className={classes.span}> 04 </span>}
      </Avatar>
    </StyledBadge>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    userSelect: "none",
    outline: "none",
    outlineStyle: "none",
    width: "100%",
    WebkitTapHighlightColor: "rgba(255,255, 255, 0)",
    WebkitTouchCallout: "none",
    MozUserSelect: "none",
    userSelect: "none",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  step: {
    cursor: "pointer",
    userSelect: "none",
    outline: "none",
    outlineStyle: "none",

    WebkitTapHighlightColor: "rgba(255,255, 255, 0)",
    WebkitTouchCallout: "none",
    MozUserSelect: "none",
  },
}));

export default function HorizontalNonLinearStepper(props) {
  const classes = useStyles();
  const { activeStep, onSelectActiveStep, steps } = props;

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map(item => (
          <Step
            key={item.id}
            connector={<ColorlibConnector />}
            onClick={() => onSelectActiveStep(item.id)}
          >
            <StepLabel
              className={classes.step}
              active={activeStep === item.id}
              icon={item.id}
              StepIconComponent={GetStepIcon}
              alternativeLabel
            >
              <span style={{ fontFamily: "Comfortaa" }}> {item.title}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
