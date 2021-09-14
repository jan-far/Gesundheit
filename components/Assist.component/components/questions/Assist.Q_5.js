import React from "react";
import { connect } from "react-redux";

import { go_to_Q6 } from "../../../../store/actions/assist";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";

import Styles from "../../css/assist.question.module.css";
import Hidden from "@material-ui/core/Hidden";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {
  QuestionComponentBigScreen,
  QuestionComponentSmallScreen,
  TemporaryDrawer,
} from "../sub_components/5_components";

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
  const classes = useStyles();
  const { selectedSubstances_Q_2 } = props;
  const [others, setOthers] = React.useState("");

  const [keys, setKeys] = React.useState(makeArray(selectedSubstances_Q_2));

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

    props.go_to_Q6(data);
  };

  return (
    <>
      <AssisQ_Nav qNumber={5} onClick={() => onProceed()} />

      <div className={Styles.root_2}>
        <div className={Styles.question_head}>
          <i> During the past three months</i>, how often have you failed to do
          what was normally expected of you because of your use of
        </div>

        <Hidden only={["md", "lg", "xl"]}>
          <div className={Styles.root_2_direction_sm}>
            Tap buttons below to choose <ArrowDownwardIcon />
          </div>
          {selectedSubstances_Q_2.map((item, index) => (
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
            question={5}
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
          {selectedSubstances_Q_2.map((item, index) => (
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
  selectedSubstances_Q_2: store.assist.answers.selectedSubstances_Q_2,
});

export default connect(mapPropsToComponent, { go_to_Q6 })(Index);
