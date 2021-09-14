import React from "react";
import Styles from "../../css/assist.sub_navbar.module.css";

import ProgressBar from "../Assist.progess_component";

const getProgress = questionHistory => {
  const current = questionHistory[0];

  if (current === "Home") return 0;
  if (current === "Feedback_Report") return 100;
  if (current[1] === "_") return parseInt(((current[2] - 1) / 8) * 100);

  return 0;
};

const getQeustionNumber = questionHistory => {
  const current = questionHistory[0];
  if (current === "Home") return "Home";
  if (current === "Feedback_Report") return "Completed!";
  if (current[1] === "_") return "Question " + current[2];

  return "UNDEFINED QUESTION NUMBER";
};

const Index = props => {
  const { questionHistory } = props;

  const value = getProgress(questionHistory);

  return (
    <div className={Styles.root_a}>
      <div className={Styles.root_a_qtn}>
        {getQeustionNumber(questionHistory)}
      </div>
      <ProgressBar value={value} />
    </div>
  );
};

export default Index;
