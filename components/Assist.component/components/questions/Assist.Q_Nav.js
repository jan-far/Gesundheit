import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import Button from "@material-ui/core/Button";

import Styles from "../../css/assist.sub_navbar.module.css";
import { go_to_previous } from "../../../../store/actions/assist";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  btn: {
    borderRadius: 0,
    fontSize: 11,
    [theme.breakpoints.down("sm")]: {
      fontSize: 9,
    },
  },
}));

const Index = props => {
  const {
    qNumber,
    onClick,
    questionHistory,
    go_to_previous,
    diabledNextButton,
    router,
  } = props;

  const classes = useStyles();

  const onGoToPrevious = () => {
    go_to_previous();
  };
  return (
    <div className={Styles.root_b}>
      <div>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => {
            if (questionHistory[0] !== "Q_1") return onGoToPrevious();
            // alert("DO SOMETHING! LIKE END FUNCTION");

            router.push("/");
          }}
        >
          {questionHistory[0] !== "Q_1" ? "PREVIOUS" : "END"}
        </Button>
      </div>
      <div>
        {qNumber !== "REPORT" && (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={() => onClick()}
            disabled={diabledNextButton ? diabledNextButton : false}
          >
            NEXT
          </Button>
        )}
      </div>
    </div>
  );
};

const mapPropsToComponent = store => ({
  questionHistory: store.assist.questionHistory,
});

export default connect(mapPropsToComponent, { go_to_previous })(
  withRouter(Index)
);
