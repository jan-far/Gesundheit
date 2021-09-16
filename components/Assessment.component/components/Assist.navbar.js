import React from "react";
import Link from "next/link";
import Slide from "@material-ui/core/Slide";

import Styles from "../css/assist.navbar.module.css";
import HomeIcon from "@material-ui/icons/Home";

const NavBar = () => {
  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
      <div className={Styles.root} style={{ userSelect: "none" }}>
        <div className={Styles.left}>
          <h1 className={Styles.logo}>Gesundheit</h1>
          <Link href="/">
            <div className={Styles.btn} unselectable="on">
              <HomeIcon fontSize="small" style={{ marginRight: 5 }} />
              Return Home
            </div>
          </Link>
        </div>
      </div>
    </Slide>
  );
};

export default NavBar;
