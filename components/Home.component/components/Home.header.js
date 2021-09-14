import React from "react";
import Link from "next/link";
import Styles from "../css/home.header.module.css";
import { useTheme } from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Pagination from "./Slider.pagination";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";

import Fab from "@material-ui/core/Fab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { animateScroll as scroll } from "react-scroll";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MainText = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <React.Fragment>
      <Slide
        direction="right"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={100}
      >
        <div className={Styles.text_first} style={{ color: "#0e4274" }}>
          Know your level of risk
        </div>
      </Slide>
      <Slide
        direction="right"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={2000}
      >
        <div>
          <div className={Styles.text_second} style={{ color: "GrayText" }}>
            Associated with use of Alcohol, tobacco products and other drugs
          </div>
          <div className={Styles.text_third} style={{ color: "black" }}>
            <div>
              {" "}
              <AlarmOnIcon fontSize={"inherit"} />{" "}
            </div>
            <div>5 to 10 minuites</div>
          </div>
          <Link href="/alcohol-substance-test">
            <div className={Styles.button} style={{ background: secondary }}>
              <span>TAKE TEST NOW </span>
            </div>
          </Link>

          <Fab
            color="secondary"
            size="small"
            aria-label="scroll back to top"
            onClick={() => scroll.scrollToBottom()}
            style={{ float: "right" }}
          >
            <KeyboardArrowDownIcon />
          </Fab>
        </div>
      </Slide>
    </React.Fragment>
  );
};

const Index = () => {
  return (
    <div className={Styles.root}>
      <div className={Styles.header_one}>
        <MainText />
      </div>

      <div className={Styles.header_two}>
        <MainImage />
      </div>
    </div>
  );
};

export default Index;

const MainImage = () => {
  const [index, setIndex] = React.useState(0);

  const handleChangeIndex = index => {
    setIndex(index);
  };

  return (
    <div className={Styles.sliding_quote_wrapper}>
      <Pagination dots={3} index={index} onChangeIndex={handleChangeIndex} />
      <AutoPlaySwipeableViews
        interval={5000}
        index={index}
        onChangeIndex={handleChangeIndex}
      >
        <div>
          Every{" "}
          <span>
            <b>10 seconds</b>{" "}
          </span>
          a person{" "}
          <span>
            <b>dies</b>
          </span>{" "}
          from alcohol related causes including cancers, heart disease, traffic
          crashes & violence <br />
          <i>
            <b>- SAFER (WHO)</b>
          </i>
        </div>
        <div>
          Around{" "}
          <span>
            <b>269 million</b>
          </span>{" "}
          people used drugs worldwide in 2018, while over{" "}
          <span>
            <b>35 million</b>
          </span>{" "}
          people suffer from drug use disorders <br />{" "}
          <i>
            <b>- Worldwide Drug Report (2020)</b>
          </i>
        </div>
        <div>
          Almost half of all people who inject drugs, an esimated{" "}
          <span>
            <b>5.5 million</b>
          </span>{" "}
          people worldwide, are living with{" "}
          <span>
            <b>hepatitis C</b>
          </span>{" "}
          <br />
          <i>
            {" "}
            <b>- Worldwide Drug Report (2020)</b>
          </i>
        </div>
      </AutoPlaySwipeableViews>
    </div>
  );
};
