import React from "react";
import Styles from "./css/footer.module.css";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { animateScroll as scroll, scroller } from "react-scroll";
import NextLink from "next/link";

const Index = () => {
  return (
    <div className={Styles.root}>
      <div className={Styles.body}>
        <div className={Styles.nav}>
          <div className={Styles.title}>Site Links</div>
          <ul>
            <li>
              <a
                onClick={() =>
                  scroller.scrollTo("about_us", {
                    duration: 1500,
                    delay: 100,
                    smooth: "easeInOutQuad",
                    offset: -100, // Scrolls to element + 50 pixels down the page
                  })
                }
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={() =>
                  scroller.scrollTo("programs", {
                    duration: 1500,
                    delay: 100,
                    smooth: "easeInOutQuad",
                    offset: -100, // Scrolls to element + 50 pixels down the page
                  })
                }
              >
                Coming Soon
              </a>
            </li>

            <li>
              <NextLink href="/login">
                <a>Login</a>
              </NextLink>
            </li>
            <li>
              <NextLink href="/alcohol-substance-test">
                <a>Take Substance test</a>
              </NextLink>
            </li>
          </ul>
        </div>
        <div className={Styles.body_1}>
          <div className={Styles.title}>Articles </div>
          <ul>
            <li>
              <a
                href="https://www.helpguide.org/articles/addictions/overcoming-drug-addiction.htm"
                target="_blank"
              >
                <b>Overcoming Drug Addiction</b>
              </a>
            </li>
            <li>
              <a
                href="https://www.addictionsandrecovery.org/five-rules-of-recovery.htm"
                target="_blank"
              >
                The Five Rules of Recovery and Relapse Prevention
              </a>
            </li>
          </ul>
        </div>
        <div className={Styles.body_2}>
          <div className={Styles.title}>Contact Us</div>
          <div className={Styles.sub}>
            For inquiry and support kindly send a message to{" "}
            <b>arksonjosiah@gmail.com</b>
          </div>
        </div>
      </div>

      <Fab
        color="secondary"
        size="small"
        aria-label="scroll back to top"
        onClick={() => scroll.scrollToTop()}
        style={{ float: "right" }}
      >
        <KeyboardArrowUpIcon />
      </Fab>

      <div className={Styles.copyright}>
        &copy; {new Date().getFullYear()} HealthLance App. All Rights Reserved.
      </div>
    </div>
  );
};

export default Index;
