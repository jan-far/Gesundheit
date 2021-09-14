import React from "react";
import clsx from "clsx";

import { withRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Stepper from "./Assist.dialog_stepper";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  Comfortaa: {
    fontFamily: "Comfortaa, cursive",
  },
  title: {
    fontWeight: 700,
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      marginTop: 50,
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Index = ({ open, handleClose, setLoading, router }) => {
  const [checked, setChecked] = React.useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const onClickEnd = () => {
    setLoading(true);
    handleClose();
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen={matches}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div className={clsx(classes.title, classes.Comfortaa)}>
          Please read to patient
        </div>
      </DialogTitle>
      <DialogContent>
        <Stepper checked={checked} setChecked={setChecked} />
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={onClickEnd}
          className={classes.Comfortaa}
        >
          End and Go back
        </Button>

        <Button
          disabled={!checked}
          onClick={handleClose}
          color="primary"
          className={classes.Comfortaa}
          variant="contained"
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withRouter(Index);
