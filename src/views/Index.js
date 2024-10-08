/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections

import Hero from "./IndexSections/Hero.js";
import Labels from "./IndexSections/Labels.js";
import Carousel from "./IndexSections/Carousel.js";
import Description from "./IndexSections/Description.js";
import Login from "./IndexSections/Login.js";
import Download from "./IndexSections/Download.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />
          <Description />
          <Carousel />
          <Labels />
          <Login />
          <Download />
        </main>
        <SimpleFooter />
         </>
    );
  }
}

export default Index;


