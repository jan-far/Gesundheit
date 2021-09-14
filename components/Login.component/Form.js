import React from "react";
import Link from "next/link";
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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 90,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.up("md")]: {
      marginTop: 130,
    },
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

function Login(props) {
  const classes = useStyles();

  const [emailorusername, setEmailorusername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
          props.authorizeUser({ ...res.data.user, token: res.data.token });
          return setUserLoading(false);
        }

        setError(res.data.msg ? res.data.msg : "");
        setUserLoading(false);
      })
      .catch(err => {
        setError("Connection Error");
        setUserLoading(false);
      });
  };

  return (
    <>
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

          <Link href="/signup">
            <div
              style={{
                cursor: "pointer",
                textAlign: "left",
                userSelect: "none",
                width: "100%",
              }}
            >
              Don't have an account yet! Click to sign up!
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default connect(null, { authorizeUser })(Login);
