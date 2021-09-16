import React from "react";
import NextLink from "next/link";
import { Link as ScrollLink, scroller } from "react-scroll";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";

import Styles from "../css/home.navbar.module.css";
import { logout } from "../../../store/actions/auth";

const useStyles = makeStyles({
  list: {
    width: "100%",
    padding: "30px 60px",
    color: "#0e4274",
  },
  spacer: {
    height: 36,
  },

  closebtn: {
    position: "fixed",
    background: "#80808063",
    margin: "6px 10px",
    right: 0,
    top: 0,
  },

  btn: {
    display: "block",
    width: "100%",
    textTransform: "capitalize",
    margin: "6px auto",
  },
});

const Link = ({ text, to }) => {
  return (
    <ScrollLink
      activeClass={Styles.active_btn}
      to={to}
      spy={true}
      smooth="easeInOutQuad"
      offset={-100}
      className={Styles.btn}
      duration={1500}
    >
      {text}
    </ScrollLink>
  );
};

const LinkXS = ({ to, text }) => {
  const onClick = () =>
    scroller.scrollTo(to, {
      duration: 1500,
      delay: 100,
      smooth: "easeInOutQuad",
      offset: -100, // Scrolls to element + 50 pixels down the page
    });

  return (
    <a onClick={onClick} className={Styles.btn}>
      {text}
    </a>
  );
};

const NavBar = ({ isAuthenticated, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [toggle, setOnToggle] = React.useState(false);

  const toggleDrawer = (event, open) => {
    console.log({ open, event });
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOnToggle(open);
  };

  const handleClose = (event, open) => {
    toggleDrawer(event, open);
  };

  const matches = useMediaQuery("(max-width:960px)");

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: matches ? 0 : 150,
    target: undefined,
  });

  const AuthBtns = (
    <>
      <NextLink href="/signup">
        <Button style={{ color: "inherit", textTransform: "capitalize" }}>
          Sign Up
        </Button>
      </NextLink>

      <NextLink href="/login">
        <Button style={{ color: "inherit", textTransform: "capitalize" }}>
          Login
        </Button>
      </NextLink>
    </>
  );

  const UserBtns = (
    <>
      <NextLink href="/profile">
        <Button style={{ color: "inherit", textTransform: "capitalize" }}>
          Go to my profile
        </Button>
      </NextLink>

      <Button
        style={{ color: "red", textTransform: "capitalize" }}
        onClick={() => logout()}
      >
        Logout
      </Button>
    </>
  );

  return (
    <React.Fragment>
      <DropDown
        toggle={toggle}
        isAuthenticated={isAuthenticated}
        setOnToggle={setOnToggle}
        toggleDrawer={toggleDrawer}
        handleClose={handleClose}
        logout={logout}
      />

      <Slide
        direction="right"
        in={!trigger}
        mountOnEnter
        unmountOnExit
        timeout={500}
      >
        <div className={Styles.root}>
          <div className={Styles.left}>
            <h1 className={Styles.logo}>Gesundheit</h1>
          </div>
          <Hidden only={["xs", "sm"]}>
            <div className={Styles.middle}>
              <Link text="About" to="about_us" />
              <Link text="Coming Soon" to="programs" />
            </div>
          </Hidden>

          <div className={Styles.right}>
            <Hidden only={["xs", "sm"]}>
              {!isAuthenticated ? AuthBtns : UserBtns}
            </Hidden>

            <Hidden only={["md", "lg", "xl"]}>
              <IconButton
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={e => toggleDrawer(e, true)}
              >
                <MenuIcon style={{ color: "#0e4274" }} />
              </IconButton>
            </Hidden>
          </div>
        </div>
      </Slide>

      <Slide
        direction="left"
        in={trigger}
        mountOnEnter
        unmountOnExit
        timeout={800}
      >
        <div className={Styles.root_trigger_bg}>
          <div className={Styles.left}>
            <h1 className={Styles.logo}>Gesundheit</h1>
          </div>
          <Hidden only={["xs", "sm"]}>
            <div className={Styles.middle}>
              <Link text="About" to="about_us" />
              <Link text="Coming soon" to="programs" />
            </div>
          </Hidden>

          <div className={Styles.right}>
            <Hidden only={["xs", "sm"]}>
              {" "}
              {!isAuthenticated ? AuthBtns : UserBtns}
            </Hidden>

            <Hidden only={["md", "lg", "xl"]}>
              <IconButton
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={e => toggleDrawer(e, true)}
              >
                <MenuIcon style={{ color: "white" }} />
              </IconButton>
            </Hidden>
          </div>
        </div>
      </Slide>
    </React.Fragment>
  );
};

const DropDown = ({ toggle, toggleDrawer, isAuthenticated, logout }) => {
  const classes = useStyles();
  const [iOS, setIOS] = React.useState(null);

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={e => toggleDrawer(e, false)}
      onKeyDown={e => toggleDrawer(e, false)}
    >
      <IconButton
        size="small"
        onClick={e => toggleDrawer(e, false)}
        className={classes.closebtn}
      >
        <CloseIcon style={{ color: "#0e4274" }} />
      </IconButton>
      <div className={classes.spacer} />
      <Divider />
      <MenuItem button>
        <LinkXS text="About " to="about_us" />
      </MenuItem>
      <Divider />

      <MenuItem button>
        <LinkXS text="Coming Soon" to="programs" />
      </MenuItem>
      <Divider />

      {!isAuthenticated ? (
        <>
          <NextLink href="/login">
            <Button variant="outlined" className={classes.btn}>
              Login
            </Button>
          </NextLink>

          <NextLink href="/signup">
            <Button variant="contained" color="primary" className={classes.btn}>
              Sign Up
            </Button>
          </NextLink>
        </>
      ) : (
        <>
          <NextLink href="/profile">
            <Button variant="contained" color="primary" className={classes.btn}>
              Go to my profile
            </Button>
          </NextLink>

          <Button
            className={classes.btn}
            style={{ color: "red" }}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );

  React.useEffect(() => {
    setIOS(process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  return (
    <SwipeableDrawer
      anchor={"top"}
      open={toggle}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      onClose={e => toggleDrawer(e, false)}
      onOpen={e => toggleDrawer(e, true)}
    >
      {list}
    </SwipeableDrawer>
  );
};

const mapPropsToComponent = store => ({
  isAuthenticated: store.auth.isAuthenticated,
});

export default connect(mapPropsToComponent, { logout })(NavBar);
