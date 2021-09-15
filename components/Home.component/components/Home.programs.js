import React from "react";
import Styles from "../css/home.programs.module.css";

const Index = () => {
  return (
    <div className={Styles.root}>
      <div className={Styles.title}>Coming Soon</div>

      <div className={Styles.body}>
        <div className={Styles.body_text}>
          <div className={Styles.body_text_1}>
            Virtual Accountability patner
          </div>
          <div className={Styles.body_text_2}>
            The power of social connection can help you stay focused and achieve
            your goal to manage your addiction!
          </div>
        </div>
        <div className={Styles.body_img_wrapper}>
          <img className={Styles.body_img} src="/svg/ass_pat.svg" />
        </div>
      </div>

      {/* <div className={Styles.body}>
        <div className={Styles.body_text}>
          <div className={Styles.body_text_1}>
            Virtual Accountability patner
          </div>
          <div className={Styles.body_text_2}>
            The power of social connection can help you stay focused and achieve
            your goal to manage your addiction!
          </div>
        </div>
        <div className={Styles.body_img_wrapper}>
          <img className={Styles.body_img} src="/svg/ass_pat.svg" />
        </div>
      </div> */}
    </div>
  );
};

export default Index;
