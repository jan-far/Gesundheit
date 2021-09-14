import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CircularProgress from "@material-ui/core/CircularProgress";
import { authorizeUser } from "../../store/actions/auth";
import SnackBar from "../general/SnackBar";
import { FullScreenLoader as IsLoadingGIF } from "../general/IsLoading";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  title: {
    color: "#504a4a",
    paddingBottom: 20,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0,
      paddingTop: 20,
    },
  },
  root: {
    flexGrow: 1,
  },
  cssLabel: {
    color: "#a79e9e",
    borderColor: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Login({ setView, handleClose, ...props }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [msg, setMsg] = React.useState("");

  const [emailorusername, setEmailorusername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gifIsLoading, setGifIsLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [checked, setChecked] = React.useState(true);

  const [userLoading, setUserLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleChange = prop => event => {
    setPassword(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const onClick = async e => {
    setUserLoading(true);
    setError("");
    e.preventDefault();
    const data = {
      emailorusername,
      password,
    };
    axios
      .post("/api/user/login", data)
      .then(res => {
        if (res.data.success) {
          setGifIsLoading(true);
          props.authorizeUser({ ...res.data.user, token: res.data.token });

          setMsg("Login Success!");
          setType("success");
          setOpen(true);
          setTimeout(() => {
            setUserLoading(false);
            handleClose();
            setGifIsLoading(false);
          }, 3000);

          return;
        }

        // setError(res.data.msg ? res.data.msg : "");

        setMsg(res.data.msg ? res.data.msg : "Error Occured!");
        setType("error");
        setOpen(true);

        setUserLoading(false);
      })
      .catch(err => {
        setMsg("Connection Error");

        setType("error");
        setOpen(true);

        setUserLoading(false);
      });
  };

  return (
    <>
      {gifIsLoading && <IsLoadingGIF />}

      {open && (
        <SnackBar
          handleClose={() => setOpen(false)}
          type={type}
          message={msg}
          zIndex={10000}
        />
      )}

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Log in
          </Typography>

          <form className={classes.form} onSubmit={e => onClick(e)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="emailorusername"
                  variant={"outlined"}
                  margin="dense"
                  required
                  fullWidth
                  id="emailorusername"
                  label="Email or Username"
                  onChange={e => setEmailorusername(e.target.value)}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Password"
                  variant={"outlined"}
                  margin="dense"
                  fullWidth
                  value={values.password}
                  onChange={handleChange("password")}
                  helperText={
                    error && (
                      <span
                        style={{
                          color: "#9a0606",
                        }}
                      >
                        {error}
                      </span>
                    )
                  }
                />
              </Grid>
            </Grid>

            <FormControlLabel
              label="Remember me"
              control={
                <Checkbox
                  value="remember"
                  color="secondary"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
              disabled={userLoading}
            >
              {userLoading ? (
                <CircularProgress
                  size={22}
                  disableShrink
                  style={{ color: "white" }}
                />
              ) : (
                <span>Log in </span>
              )}
            </Button>
          </form>

          <div
            style={{
              cursor: "pointer",
              textAlign: "left",
              userSelect: "none",
              width: "100%",
            }}
            onClick={() => setView(1)}
          >
            Don't have an account yet! Click to sign up!
          </div>
        </div>
      </Container>
    </>
  );
}

export default connect(null, { authorizeUser })(Login);
