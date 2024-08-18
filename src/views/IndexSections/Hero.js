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
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section className="section section-lg section-hero section-shaped" >
            {/* Background image */}
            <div
              className="shape shape-style-1"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,255,0), rgba(75,0,130,0.7)), url(${require("assets/img/Images/slider.png")})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            ></div>
            {/* Background circles */}
            <div className="shape shape-style-1">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>

            <Container className="shape-container d-flex align-items-center ">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/argon-react-white.png")}
                      style={{ width: "400px" }}
                    />
                    
                    <div className="btn-wrapper mt-5" >
                   
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0"
                        color="default"
                        href=""
                        size="lg"
                        to="/booking-page" tag={Link}
                      >
                        <span className="btn-inner--icon mr-2">
                          <i className="ni ni-shop" />
                        </span>
                        <span className="btn-inner--text mr-3">Reservar</span>
                      </Button>{" "}
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        color="default"
                        href=""
                        size="lg"
                      >
                        <span className="btn-inner--icon mr-2 ">
                          <i className="ni ni-user-run" />
                        </span>
                        <span className="btn-inner--text">
                          <span className="text-warning mr-3">Contactar</span>
                          
                        </span>
                      </Button>
                    </div>
                    <div className="mt-5">
                      <small className="text-white display-2 font-weight-bold mb-0 mr-2">
                        Nuevas Experiencias
                      </small>
                      <p className="lead text-white font-weight-bold mb-0 mr-2">
                    Bienvenido a Infinity360, donde el lujo y la comodidad se encuentran en perfecta armonía.
                    
                    </p>
                    <Button
                        className="btn-info btn-icon  mt-4 mb-sm-0"
                        color="info"
                        href=""
                        size="lg"
                        to="/manual-page" tag={Link}
                      >
                        <span className="btn-inner--icon mr-2">
                          <i className="ni ni-single-copy-04" />
                        </span>
                        <span className="btn-inner--text mr-3"  >Manual de Usuario</span>
                      </Button>
                      
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
