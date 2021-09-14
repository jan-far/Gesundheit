import React from "react";
import { Element } from "react-scroll";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";

import NavBar from "./components/Home.navbar";
import Header from "./components/Home.header";
import AboutUs from "./components/Home.about_us";
import Programs from "./components/Home.programs";
import Footer from "../general/Footer";

const Index = () => {
  const router = useRouter();
  const { asPath } = router;

  React.useEffect(() => {
    if (asPath === "/#coming-soon") {
      scroller.scrollTo("programs", {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: -50, // Scrolls to element + 50 pixels down the page
      });
    }

    if (asPath === "/#about") {
      scroller.scrollTo("about_us", {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: -50, // Scrolls to element + 50 pixels down the page
      });
    }
  }, []);

  // 32908851

  return (
    <>
      <NavBar />

      <Element name="header">
        <Header />
      </Element>

      <Element name="about_us">
        <AboutUs />
      </Element>

      <Element name="programs">
        <Programs />
      </Element>

      <Footer />

      <style jsx global>{`
        body::-webkit-scrollbar {
          display: none;
          background-color: red;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </>
  );
};

export default Index;
