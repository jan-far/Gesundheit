import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

import Styles from "../../css/assist.question.module.css";
import { go_to_Q2 } from "../../../../store/actions/assist";

import AssisQ_Nav from "./Assist.Q_Nav";
import Exit_Dialog from "../Assist.Exit_Dialog";

const Index = props => {
  console.log("check rerender 1");
  const { substances } = props;
  const [others, setOthers] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [keys, setKeys] = React.useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
  });

  const handleChange = (id, e) => {
    const value = e === "true" ? true : false;
    setKeys(x => {
      let all = x;
      all[id] = value;

      return { ...all };
    });
  };

  const handleChangeJ = e => {
    const value = e.target.value.trim();

    if (!keys["J"]) setKeys({ ...keys, J: true });
    if (!value) setKeys({ ...keys, J: false });

    if (value.length >= 30) {
      return;
    } else {
      setOthers(value);
    }
  };

  const onProceed = () => {
    const myArr = Object.keys(keys);

    const numberOfSelectedYES = myArr.filter(item => keys[item] === true);

    if (!numberOfSelectedYES.length) {
      return handleClickOpen();
    }

    props.go_to_Q2({
      all: substances,
      selected: numberOfSelectedYES,
      J: others && keys.J ? others : null,
    });
  };

  return (
    <>
      <Exit_Dialog open={open} handleClose={handleClose} />
      <AssisQ_Nav qNumber={1} onClick={() => onProceed()} />

      <div className={Styles.root_1}>
        <div className={Styles.question_head}>
          In your life, which of the following substances have you ever used?
          even when you were in school?
          <span>- NON-MEDICAL USE ONLY</span>
        </div>

        <div className={Styles.root_1_question}>
          <div className={Styles.root_1_question_name}></div>
          <div className={Styles.root_1_question_options}>Yes</div>
          <div className={Styles.root_1_question_options}>No</div>
        </div>

        <div className={Styles.root_1_questions_container}>
          {substances.map((item, index) => (
            <React.Fragment key={Math.random()}>
              <QuestionComponent
                keys={keys}
                item={item}
                handleChange={handleChange}
              />
            </React.Fragment>
          ))}

          <div className={Styles.root_1_question}>
            <div className={Styles.root_1_question_name}>
              Others - specify:{" "}
              <TextField
                margin="dense"
                value={others}
                onChange={e => handleChangeJ(e)}
                style={{ width: "50%", marginLeft: 30 }}
              />
            </div>

            <div className={Styles.root_1_question_options}>
              {others.trim() ? (
                <Radio
                  checked={keys["J"] === true}
                  onChange={e => handleChange("J", e.target.value)}
                  value="true"
                  name={"J"}
                  inputProps={{ "aria-label": "J" }}
                />
              ) : null}
            </div>
            <div className={Styles.root_1_question_options}>
              {others.trim() ? (
                <Radio
                  checked={keys["J"] === false}
                  onChange={e => handleChange("J", e.target.value)}
                  value="false"
                  name={"J"}
                  inputProps={{ "aria-label": "J" }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const QuestionComponent = ({ item, keys, handleChange }) => {
  return (
    <div className={Styles.root_1_question}>
      <div className={Styles.root_1_question_name}>{item.name}</div>

      <div className={Styles.root_1_question_options}>
        <Radio
          size="small"
          checked={keys[item.id] === true}
          onChange={e => handleChange(item.id, e.target.value)}
          value="true"
          name={item.id + 1}
          inputProps={{ "aria-label": Math.random() }}
        />
      </div>
      <div className={Styles.root_1_question_options}>
        <Radio
          size="small"
          checked={keys[item.id] === false}
          onChange={e => handleChange(item.id, e.target.value)}
          value="false"
          name={item.id + 4}
          inputProps={{ "aria-label": Math.random() }}
        />
      </div>
    </div>
  );
};

const mapPropsToComponent = store => ({
  substances: store.assist.substances,
});

export default connect(mapPropsToComponent, { go_to_Q2 })(Index);
