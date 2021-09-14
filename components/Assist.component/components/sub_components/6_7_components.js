import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import Button from "@material-ui/core/Button";

import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";

import Styles from "../../css/assist.question.module.css";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 600,
  },
  tb_head: {
    padding: 444,
  },
  rot: {
    width: "100%",
    fontWeight: 700,
    height: "100%",
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 1,
  },
  rot_gray: {
    backgroundColor: theme.palette.action.hover,
  },
  rot_white: {
    backgroundColor: "inherit",
  },
  typography: {
    padding: theme.spacing(2),
  },
  btn: {
    fontSize: 9,
  },
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const QuestionComponentBigScreen = ({ item, keys, handleChange }) => {
  const keyValue = keys[item.id].value;
  return (
    <div className={Styles.root_2_question}>
      <div className={Styles.root_2_question_name_6}>{item.name}</div>

      <div className={Styles.root_2_question_options_6}>
        <Radio
          size="small"
          checked={keyValue === "0"}
          onChange={e => handleChange(item.id, e.target.value, e.target.name)}
          value="0"
          name="No, Never"
          inputProps={{ "aria-label": Math.random() }}
        />
      </div>
      <div className={Styles.root_2_question_options_6}>
        <Radio
          size="small"
          checked={keyValue === "6"}
          onChange={e => handleChange(item.id, e.target.value, e.target.name)}
          value="6"
          name="Yes, in the past 3 months"
          inputProps={{ "aria-label": Math.random() }}
        />
      </div>
      <div className={Styles.root_2_question_options_6}>
        <Radio
          size="small"
          checked={keyValue === "3"}
          onChange={e => handleChange(item.id, e.target.value, e.target.name)}
          value="3"
          name="Yes, but not in the past 3 months"
          inputProps={{ "aria-label": Math.random() }}
        />
      </div>
    </div>
  );
};

export const QuestionComponentSmallScreen = ({
  item,
  keys,
  handleChange,
  popOverProps,
}) => {
  const keyValue = keys[item.id].value;
  const classes = useStyles();
  const { toggleDrawer } = popOverProps;

  return (
    <div className={Styles.root_2_question}>
      <div className={Styles.root_2_question_name}>{item.name}</div>
      <div className={Styles.root_2_question_options}>
        <Button
          color="primary"
          size="small"
          variant="outlined"
          className={classes.btn}
          onClick={toggleDrawer(true, item)}
        >
          {keys[item.id].Q2_name}
        </Button>
      </div>
    </div>
  );
};

export function TemporaryDrawer({
  drawer,
  toggleDrawer,
  question,
  keys,
  handleChange,
  item,
}) {
  const [iOS, setiOS] = React.useState(null);
  const keyValue = item && keys[item.id].value;

  React.useEffect(() => {
    setiOS(process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={drawer}
      onOpen={() => {}}
      onClose={toggleDrawer(false)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <div className={Styles.question_sm_screen}>
        <div className={Styles.question_head_sm_screen_2_5}>
          {questionTitle[question].replace("{{drug}}", item ? item.name : "")}
        </div>
        <div className={Styles.root_2_question_options_sm}>
          <div>No, Never</div>{" "}
          <Radio
            size="small"
            checked={keyValue === "0"}
            onChange={e => handleChange(item.id, e.target.value, e.target.name)}
            value="0"
            name="No, Never"
            inputProps={{ "aria-label": Math.random() }}
          />
        </div>
        <div className={Styles.root_2_question_options_sm}>
          <div>Yes, in the past 3 months</div>
          <Radio
            size="small"
            checked={keyValue === "6"}
            onChange={e => handleChange(item.id, e.target.value, e.target.name)}
            value="6"
            name="Yes, in the past 3 months"
            inputProps={{ "aria-label": Math.random() }}
          />
        </div>
        <div className={Styles.root_2_question_options_sm}>
          <div>Yes, but not in the past 3 months</div>
          <Radio
            size="small"
            checked={keyValue === "3"}
            onChange={e => handleChange(item.id, e.target.value, e.target.name)}
            value="3"
            name="Yes, but not in the past 3 months"
            inputProps={{ "aria-label": Math.random() }}
          />
        </div>
      </div>
    </SwipeableDrawer>
  );
}

const questionTitle = {
  6: "Has a friend or relative or anyone else ever expressed concern about your use of  {{drug}}?",
  7: "Have you ever Have you ever tried and failed to control, cut down or stop using {{drug}}?",
};
