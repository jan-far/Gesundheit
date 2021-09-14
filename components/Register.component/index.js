import React from "react";
import { Element } from "react-scroll";
import Styles from "./css/register.module.css";
import Slide from "@material-ui/core/Slide";

import NavBar from "../general/NavBar";
import Form from "./Form";

const Index = () => {
  return (
    <>
      <NavBar direction="right" timeout={1000} />

      <div className={Styles.root}>
        <Slide
          direction={"right"}
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
