import React from "react";
import { Element } from "react-scroll";
import Styles from "./css/login.module.css";
import Slide from "@material-ui/core/Slide";

import NavBar from "../general/NavBar";
import Form from "./Form";
const Index = () => {
  return (
    <>
      <NavBar direction="left" timeout={1000} />

      <div className={Styles.root}>
        <Slide
          direction={"left"}
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <div className={Styles.form}>
            <Form />
          </div>
        </Slide>
      </div>
    </>
  );
};

export default Index;
