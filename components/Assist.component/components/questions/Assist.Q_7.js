import React from "react";
import { connect } from "react-redux";

import { go_to_Q8 } from "../../../../store/actions/assist";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";

import Styles from "../../css/assist.question.module.css";
import Hidden from "@material-ui/core/Hidden";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {
  QuestionComponentBigScreen,
  QuestionComponentSmallScreen,
  TemporaryDrawer,
} from "../sub_components/6_7_components";

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
  const { selectedSubstances_Q_1 } = props;
  const [others, setOthers] = React.useState("");

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

    props.go_to_Q8(data);
  };

  return (
    <>
      <AssisQ_Nav qNumber={7} onClick={() => onProceed()} />

      <div className={Styles.root_2}>
        <div className={Styles.question_head}>
          Have you ever tried and failed to control, cut down or stop using any
          of the following substances
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
            question={6}
            keys={keys}
            handleChange={handleChange}
            item={selectedItemSM}
          />
        </Hidden>

        <Hidden only={["xs", "sm"]}>
          <div className={Styles.root_2_question}>
            <div className={Styles.root_2_question_name_6}></div>
            <div className={Styles.root_2_question_options_6}>No, Never</div>
            <div className={Styles.root_2_question_options_6}>
              Yes, in the past 3 months{" "}
            </div>
            <div className={Styles.root_2_question_options_6}>
              Yes, but not in the past 3 months
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

export default connect(mapPropsToComponent, { go_to_Q8 })(Index);
