import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import Hidden from "@material-ui/core/Hidden";

import Styles from "../../css/assist.question.module.css";
import { go_to_Q3, jump_to_Q6 } from "../../../../store/actions/assist";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";

import {
  QuestionComponentBigScreen,
  QuestionComponentSmallScreen,
  TemporaryDrawer,
} from "../sub_components/2_components";

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

const makeArray = arr => {
  const data = {};
  arr.map(item => {
    const { id, name } = item;
    data[id] = { id, name, value: "0", Q2_name: "Never" };
  });

  return data;
};

const Index = props => {
  console.log("check rerender 2");
  const classes = useStyles();
  const { selectedSubstances_Q_1 } = props;

  const [keys, setKeys] = React.useState(makeArray(selectedSubstances_Q_1));

  // DRAWER PROPS
  const [drawer, setDrawer] = React.useState(false);
  const [selectedItemSM, setSelectedItemSM] = React.useState(null);

  const toggleDrawer = (open, selItem) => event => {
    if (event) {
      if (event.type) {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
      }
    }
    if (selItem) setSelectedItemSM(selItem);
    console.log({ selItem });
    setDrawer(open);
  };

  // DRAWER PROPS END

  const handleChange = (id, value, name) => {
    setKeys(x => {
      let all = x;

      all[id].value = value;
      all[id].Q2_name = name;

      return { ...all };
    });
  };

  const onProceed = () => {
    const allId = Object.keys(keys);

    const data = [];
    allId.map(id => {
      if (keys[id].value !== "0") data.push(keys[id]);
      return;
    });

    if (!data.length) return props.jump_to_Q6(); // JUMPS TO SIX alert("SKIP TO QUESTION 6");

    props.go_to_Q3(data);
  };

  return (
    <>
      <AssisQ_Nav qNumber={2} onClick={() => onProceed()} />

      <div className={Styles.root_2}>
        <div className={Styles.question_head}>
          <i> In the past three months</i>, how often have you used the
          substances you mentioned?
        </div>

        <Hidden only={["md", "lg", "xl"]}>
          <div className={Styles.root_2_direction_sm}>
            Tap buttons below to choose <ArrowDownwardIcon />
          </div>
          {selectedSubstances_Q_1.map((item, index) => (
            <QuestionComponentSmallScreen
              key={index}
              item={item}
              keys={keys}
              handleChange={handleChange}
              popOverProps={{ toggleDrawer, setSelectedItemSM }}
            />
          ))}
          <TemporaryDrawer
            drawer={drawer}
            toggleDrawer={toggleDrawer}
            question={2}
            keys={keys}
            handleChange={handleChange}
            item={selectedItemSM}
          />
        </Hidden>

        <Hidden only={["xs", "sm"]}>
          <div className={Styles.root_2_question}>
            <div className={Styles.root_2_question_name}></div>
            <div className={Styles.root_2_question_options}>Never</div>
            <div className={Styles.root_2_question_options}>Once or Twice</div>
            <div className={Styles.root_2_question_options}>Monthly</div>
            <div className={Styles.root_2_question_options}>Weekly</div>
            <div className={Styles.root_2_question_options}>
              Daily or Almost Daily
            </div>
          </div>
          {selectedSubstances_Q_1.map((item, index) => (
            <QuestionComponentBigScreen
              key={index}
              item={item}
              keys={keys}
              handleChange={handleChange}
            />
          ))}
        </Hidden>
      </div>
    </>
  );
};

const mapPropsToComponent = store => ({
  selectedSubstances_Q_1: store.assist.answers.selectedSubstances_Q_1,
});

export default connect(mapPropsToComponent, { go_to_Q3, jump_to_Q6 })(Index);
