import React from "react";
import axios from "axios";
import Link from "next/link";

import { connect } from "react-redux";
// import { TextField as FTextField } from "@fluentui/react/lib-commonjs/TextField";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { FullScreenLoader as IsLoadingGIF } from "../general/IsLoading";
import SnackBar from "../general/SnackBar";

import { authorizeUser } from "../../store/actions/auth";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 90,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
  },
  title: {
    color: "#504a4a",
    paddingBottom: 20,
  },
  cssLabel: {
    color: "#a79e9e",
  },
  cssLabel2: {
    color: "lime",
  },
  terms: {
    color: "red",
  },
}));

function Register(props) {
  const classes = useStyles();

  const [fullname, setFullname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [gifIsLoading, setGifIsLoading] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [msg, setMsg] = React.useState("");

  const handleChange = prop => event => {
    setPassword(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onClick = e => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      fullname,
      username,
      email,
      password,
    };

    axios
      .post("/api/user/register", data)
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          setGifIsLoading(true);

          setTimeout(() => {
            props.authorizeUser({ ...res.data.user, token: res.data.token });

            setGifIsLoading(false);
          }, 4000);

          setMsg("Your registration was successful!");
          setType("success");
          setOpen(true);
          return setIsLoading(false);
        }

        setMsg(res.data.msg);
        setType("warning");
        setOpen(true);
        return setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setMsg("Connection Error");
        setType("error");
        setOpen(true);
        return setIsLoading(false);
      });
  };

  return (
    <div>
      {gifIsLoading && <IsLoadingGIF />}

      {open && (
        <SnackBar
          handleClose={() => setOpen(false)}
          type={type}
          message={msg}
        />
      )}
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Sign up
          </Typography>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={e => onClick(e)}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="text"
                  label="Full Name"
                  onChange={e => setFullname(e.target.value)}
                  margin="dense"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="email"
                  label="Email Address"
                  onChange={e => setEmail(e.target.value)}
                  margin="dense"
                  required
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Username"
                  onChange={e => setUsername(e.target.value)}
                  margin="dense"
                  required
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  id="outlined-adornment-password"
                  className={clsx(classes.margin, classes.textField)}
                  required
                  fullWidth
                  type={values.showPassword ? "text" : "password"}
                  label="Password"
                  value={values.password}
                  onChange={handleChange("password")}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          color="inherit"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.cssOutlinedInput,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              color="primary"
              className={classes.submit}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress
                  size={22}
                  style={{ color: "white" }}
                  disableShrink
                />
              ) : (
                ""
              )}
              {!isLoading ? <span> Sign up</span> : ""}
            </Button>
          </form>

          <Link href="login">
            <div
              style={{
                cursor: "pointer",
                textAlign: "left",
                userSelect: "none",
                width: "100%",
              }}
            >
              Already have an account! Click to login!
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default connect(null, { authorizeUser })(Register);
