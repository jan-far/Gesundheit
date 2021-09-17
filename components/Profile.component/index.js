import React from "react";
import axios from "axios";
import Link from "next/link";
import Styles from "./Profile.module.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Navbar from "./Profile.navbar";
import useRequest from "../../libs/useRequest";
import { InlineLoader } from "../general/IsLoading";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogComponent from "./ViewSingleReport";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import LaunchIcon from "@material-ui/icons/Launch";

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  avatar: {
    color: "white",
    background: "#0e4274",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  btn: {
    marginRight: 10,
    marginTop: 5,
    fontSize: 15,
    padding: 15,

    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
}));

function Index({ user }) {
  const classes = useStyles();
  const { fullname, email, id } = user;
  const [substances, setSubstances] = React.useState(null);
  const [view, setView] = React.useState("first");
  const [answers, setAnswers] = React.useState(null);

  const { data, error, isValidating, mutate } = useRequest({
    url: "/api/user/results/" + id,
  });

  const deleteSingle = async report_id => {
    console.log({ report_id });
    try {
      const res = await axios.post("/api/user/result/delete", {
        id: report_id,
        userID: id,
      });

      mutate();
    } catch (e) {}
  };

  const openSingle = data => {
    setAnswers(data);
    setView("second");
  };

  const getSubstances = async () => {
    try {
      const res = await axios.get("/api/assist/substance/all");

      setSubstances(res.data);
    } catch (e) {}
  };

  React.useEffect(() => {
    if (!substances) getSubstances();
  });

  if (view === "second")
    return (
      <DialogComponent
        handleClose={() => {
          setAnswers("");
          setView("first");
        }}
        substances={substances}
        answers={answers}
      />
    );

  return (
    <>
      <Navbar />

      <div className={Styles.root}>
        <div className={Styles.headerA}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar className={classes.avatar}>{fullname[0]}</Avatar>{" "}
          </StyledBadge>

          <div className={Styles.headerA_1}>
            <div className={Styles.name}>{fullname}</div>{" "}
            <div className={Styles.email}>
              <span>@</span> {email}
            </div>
          </div>
        </div>

        <div className={Styles.headerB}>
          <Link href="/assessment?from=profile">
            <Button
              size={"small"}
              variant="contained"
              color="secondary"
              className={classes.btn}
            >
              Take A Test
            </Button>
          </Link>

          <div className={Styles.title}>My Activity</div>

          <div className={Styles.group_A}>
            <div className={Styles.buttons}>
              <div className={Styles.title_sub}>
                <b>
                  Recent Saved Tests{" "}
                  <span>{data ? data.results.length : "-"}</span>
                </b>
              </div>{" "}
            </div>

            <div>{isValidating && <InlineLoader />}</div>
            <div>{error && <h2>An Error Occured. Try Reloading Page!</h2>}</div>

            <div>
              {data && (
                <ListItems
                  deleteSingle={deleteSingle}
                  openSingle={openSingle}
                  results={data.results ? data.results : []}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapPropsToComponent = store => ({
  user: store.auth.user,
});

export default connect(mapPropsToComponent)(Index);

const ListItems = ({ results, deleteSingle, openSingle }) => {
  const classes = useStyles();
  return (
    <List>
      {" "}
      {results.map(item => {
        const data = JSON.parse(item.data);

        return (
          <React.Fragment key={item._id}>
            <ListItem>
              <ListItemText
                primary={
                  <span className={Styles.list_wrapper_name}>
                    <b>{data.name}</b>
                  </span>
                }
                secondary={
                  <span className={Styles.list_wrapper_date}>
                    {new Date(data.date).toString().split("GMT")[0]}
                  </span>
                }
              />

              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => openSingle(data)}
                >
                  <LaunchIcon style={{ color: "green" }} />
                </IconButton>

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteSingle(item._id)}
                >
                  <DeleteIcon style={{ color: "orangered" }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};
