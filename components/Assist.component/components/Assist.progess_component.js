import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

export const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 7,
    borderRadius: 5,
  },
  // colorPrimary: {
  //   backgroundColor:
  //     theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  // },
  // bar: {
  //   borderRadius: 5,
  //   backgroundColor: "#1a90ff",
  // },
}))(LinearProgress);

export function CircularProgressWithLabel2(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearProgressWithLabel2({ value }) {
  value = value ? Math.round(parseInt(value)) : 0;
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        {/* <LinearProgress variant="determinate" value={value} /> */}
        <BorderLinearProgress variant="determinate" value={value} />
      </Box>
      <Box minWidth={35}>
        <CircularProgressWithLabel2 value={value} />
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel2;
