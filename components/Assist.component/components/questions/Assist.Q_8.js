import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";

import { go_to_Feedback_Report } from "../../../../store/actions/assist";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
}));

const Index = props => {
  const classes = useStyles();
  const [keyValue, setKeyValue] = React.useState("");
  const [patternOfInjecting, setPatternOfInjecting] = React.useState("");
  const [diabledNextButton, setDiabledNextButton] = React.useState(true);

  const handleChange = value => {
    setKeyValue(value);
  };

  const onProceed = () => {
    let pattern = "";

    if (
      patternOfInjecting === "Once weekly or less" ||
      patternOfInjecting === "Fewer than 3 days in a row"
    )
      pattern = "Brief Intervention";

    if (
      patternOfInjecting === "More than once per week" ||
      patternOfInjecting === "3 or more days in a row"
    )
      pattern = "More Intensive Treatment";

    if (patternOfInjecting === "Yes, but not in the past 3 months")
      pattern = "Yes, but not in the past 3 months";

    props.go_to_Feedback_Report({
      usedDrugByInjection: keyValue,
      patternOfInjecting: pattern,
    });
  };

  React.useEffect(() => {
    if (diabledNextButton) {
      if (keyValue !== "") setDiabledNextButton(false);
    }

    if (keyValue === "0") setPatternOfInjecting("");

    if (keyValue !== "0" && patternOfInjecting === "")
      setDiabledNextButton(true);
  }, [keyValue, patternOfInjecting]);

  return (
    <>
      <AssisQ_Nav
        qNumber={8}
        onClick={() => onProceed()}
        diabledNextButton={diabledNextButton}
      />

      <div className={Styles.root_2}>
        <div className={Styles.question_head}>
          Have you ever used any drug by injection?
          <span>NON-MEDICAL USE ONLY</span>
        </div>

        <div className={Styles.root_Q_8_wrapper}>
          <div>No, Never</div>
          <Radio
            size="small"
            checked={keyValue === "0"}
            onChange={e => handleChange(e.target.value)}
            value="0"
            name="No, Never"
            inputProps={{ "aria-label": Math.random() }}
          />
        </div>

        <div className={Styles.root_Q_8_wrapper}>
          <div>Yes, in the past 3 months</div>
          <Radio
            size="small"
            checked={keyValue === "2"}
            onChange={e => {
              setDiabledNextButton(false);
              handleChange(e.target.value);
            }}
            value="2"
            name="Yes, in the past 3 months"
            inputProps={{ "aria-label": Math.random() }}
          />
        </div>
        {keyValue === "2" ? (
          <div className={Styles.root_Q_8_wrapper_sub}>
            <h4>Pattern of Injecting?</h4>

            <div>
              <Radio
                size="small"
                checked={patternOfInjecting === "Once weekly or less"}
                onChange={e => setPatternOfInjecting(e.target.value)}
                value="Once weekly or less"
                name="Yes, but not in the past 3 months"
                inputProps={{ "aria-label": Math.random() }}
                id="ppp2"
              />
              <label htmlFor="ppp2">Once weekly or less</label>
            </div>

            <div>
              <Radio
                size="small"
                checked={patternOfInjecting === "Fewer than 3 days in a row"}
                onChange={e => setPatternOfInjecting(e.target.value)}
                value="Fewer than 3 days in a row"
                name="Yes, but not in the past 3 months"
                inputProps={{ "aria-label": Math.random() }}
                id="ppp3"
              />
              <label htmlFor="ppp3">Fewer than 3 days in a row </label>
            </div>

            <div>
              <Radio
                size="small"
                checked={patternOfInjecting === "More than once per week"}
                onChange={e => setPatternOfInjecting(e.target.value)}
                value="More than once per week"
                name="Yes, but not in the past 3 months"
                inputProps={{ "aria-label": Math.random() }}
                id="ppp1"
              />
              <label htmlFor="ppp1">More than once per week </label>
            </div>

            <div>
              <Radio
                size="small"
                checked={patternOfInjecting === "3 or more days in a row"}
                onChange={e => setPatternOfInjecting(e.target.value)}
                value="3 or more days in a row"
                name="Yes, but not in the past 3 months"
                inputProps={{ "aria-label": Math.random() }}
                id="ppp4"
              />
              <label htmlFor="ppp4">3 or more days in a row</label>
            </div>
          </div>
        ) : null}
        <div className={Styles.root_Q_8_wrapper}>
          <div>Yes, but not in the past 3 months</div>
          <Radio
            size="small"
            checked={keyValue === "1"}
            onChange={e => {
              handleChange(e.target.value);
              setPatternOfInjecting("Yes, but not in the past 3 months");
            }}
            value="1"
            name="Yes, but not in the past 3 months"
            inputProps={{ "aria-label": Math.random() }}
          />
        </div>
      </div>
    </>
  );
};

export default connect(null, { go_to_Feedback_Report })(Index);
