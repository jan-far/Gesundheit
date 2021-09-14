// import React from "react";
// import Backdrop from "@material-ui/core/Backdrop";
// // import CircularProgress from "@material-ui/core/CircularProgress";
// import { makeStyles } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

// import Styles from "./css/isLoading.module.css";

// const LoaderOne = ({ value }) => {
//   const type = value ? value : "light";
//   return (
//     <div className={Styles[`sk-chase-${type}`]}>
//       <div className={Styles[`sk-chase-${type}-dot`]}></div>
//       <div className={Styles[`sk-chase-${type}-dot`]}></div>
//       <div className={Styles[`sk-chase-${type}-dot`]}></div>
//       <div className={Styles[`sk-chase-${type}-dot`]}></div>
//       <div className={Styles[`sk-chase-${type}-dot`]}></div>
//       <div className={Styles[`sk-chase-${type}-dot`]}></div>
//     </div>
//   );
// };

// const useStyles = makeStyles(theme => ({
//   fullscreen: {
//     zIndex: theme.zIndex.drawer + 1,
//     background: "rgb(45 6 89 / 43%)",
//     color: "#fff",
//   },
//   inline: {
//     display: "flex",
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 400,
//   },
// }));

// export function FullScreenLoader(props) {
//   const classes = useStyles();
//   const matches = useMediaQuery("(min-width:960px)");

//   return (
//     <>
//       <Backdrop className={classes.fullscreen} open={true} onClick={() => {}}>
//         <LoaderOne />
//       </Backdrop>
//     </>
//   );
// }

// export function InlineLoader(props) {
//   const classes = useStyles();

//   return (
//     <div className={classes.inline}>
//       <LoaderOne value={props.type ? props.type : null} />
//     </div>
//   );
// }

import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import Styles from "./css/isLoading.module.css";

const LoaderOne = ({ value }) => {
  const type = value ? value : "light";
  return (
    <div className={Styles[`sk-chase-${type}`]}>
      <div className={Styles[`sk-chase-${type}-dot`]}></div>
      <div className={Styles[`sk-chase-${type}-dot`]}></div>
      <div className={Styles[`sk-chase-${type}-dot`]}></div>
      <div className={Styles[`sk-chase-${type}-dot`]}></div>
      <div className={Styles[`sk-chase-${type}-dot`]}></div>
      <div className={Styles[`sk-chase-${type}-dot`]}></div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  fullscreen: {
    zIndex: theme.zIndex.drawer + 1,
    background: "rgb(45 6 89 / 43%)",
    color: "#fff",
  },
  inline: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
}));

export function FullScreenLoader(props) {
  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.fullscreen} open={true} onClick={() => {}}>
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </>
  );
}

export function InlineLoader(props) {
  const classes = useStyles();

  return (
    <div className={classes.inline}>
      <CircularProgress />
    </div>
  );
}
