import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Styles from "../css/assist.module.css";
import { connect } from "react-redux";

const Index = props => {
  const { substances } = props;
  console.log("iiieeuue");
  const [others, setOthers] = React.useState("");

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

  const onProceed = () => {
    console.log(keys);

    const myArr = Object.keys(keys);

    const atLeastOneKeyIsTrue = myArr.filter(item => keys[item] === true);

    if (!atLeastOneKeyIsTrue.length) {
      alert(
        "Kindly note that you have answered 'NO' to all items. Suggesting that you have never used these substances. Thank you for participating in this ASSIST. Your Interview Ends Here"
      );

      // EXIT CALL
      return (window.location = "/");
    }

    props.goToQuestionTwo();
  };

  return (
    <div className={Styles.body}>
      <div className={Styles.body_1}>
        <Typography variant="h5">Question 1</Typography>
        <Button size="small" variant="contained" onClick={() => onProceed()}>
          PROCEED
        </Button>
      </div>
      <Paper elevation={10} className={Styles.body_2}>
        <Typography variant="body1">
          In your life, which of the following substances have you In your life,
          which of the following substances have you ever used?{" "}
          <i>(NON-MEDICAL U MEDICAL U MEDICAL USE ONLY)</i>
        </Typography>
        <Divider />

        <div className={Styles.q_list_wrapper}>
          <div className={Styles.q_head}>
            <p>Yes</p> <p>No</p>
          </div>
          <div className={Styles.q_list}>
            {substances.map(item => (
              <React.Fragment key={item.id}>
                <div className={Styles.item}>
                  <div className={Styles.item_1}>
                    {item.id}: {item.name}
                  </div>
                  <div className={Styles.item_2}>
                    <Radio
                      checked={keys[item.id] === true}
                      onChange={e => handleChange(item.id, e.target.value)}
                      value="true"
                      name={item.id}
                      inputProps={{ "aria-label": item.id }}
                    />

                    <Radio
                      checked={keys[item.id] === false}
                      onChange={e => handleChange(item.id, e.target.value)}
                      value="false"
                      name={item.id}
                      inputProps={{ "aria-label": item.id }}
                    />
                  </div>
                </div>
                <Divider />
              </React.Fragment>
            ))}
            <div className={Styles.item}>
              <div className={Styles.item_1}>
                J: Other - specify:{" "}
                <TextField
                  margin="dense"
                  onChange={e => {
                    if (!keys["J"]) setKeys({ ...keys, J: true });
                    if (!e.target.value.trim()) setKeys({ ...keys, J: false });
                    setOthers(e.target.value.trim());
                  }}
                  style={{ width: "50%", marginLeft: 30 }}
                />
              </div>
              {others.trim() && (
                <div className={Styles.item_2}>
                  <Radio
                    checked={keys["J"] === true}
                    onChange={e => handleChange("J", e.target.value)}
                    value="true"
                    name={"J"}
                    inputProps={{ "aria-label": "J" }}
                  />

                  <Radio
                    checked={keys["J"] === false}
                    onChange={e => handleChange("J", e.target.value)}
                    value="false"
                    name={"J"}
                    inputProps={{ "aria-label": "J" }}
                  />
                </div>
              )}
            </div>
            <Divider />
          </div>
        </div>
      </Paper>
    </div>
  );
};

const mapPropsToComponent = store => ({
  substances: store.assist.substances,
});

export default connect(mapPropsToComponent)(Index);
