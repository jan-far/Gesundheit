import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import Close from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 40,
    width: 572,
    height: 514,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 10,
      height: 500,
    },
  },
  closebtn: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 20,
    zIndex: 1000,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const [value, setValue] = React.useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Paper square className={classes.paper}>
        <IconButton className={classes.closebtn} onClick={handleClose}>
          <Close />{" "}
        </IconButton>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Login" />
          <Tab label="Sign up" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <LoginForm setView={setValue} handleClose={handleClose} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterForm setView={setValue} handleClose={handleClose} />
        </TabPanel>
      </Paper>
    </Dialog>
  );
}

export default function SimpleDialogDemo({ open, handleClose }) {
  return <SimpleDialog open={open} onClose={handleClose} />;
}
