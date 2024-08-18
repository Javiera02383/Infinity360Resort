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

// reactstrap components
import { Button, Badge, Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: require("assets/img/Images/services-0.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/Images/services-2.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/Images/services-3.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/Images/services-4.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/Images/services-5.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
];

class Carousel extends React.Component {
  render() {
    return (
      <>
        <section className="section section-shaped">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="text-white font-weight-light">
                <strong>¡Te ofrecemos!</strong>
                </h1>
                <p className="lead text-white mt-2">
                Más allá de la comodidad: Disfruta de todos los servicios que elevan tu estancia.
                </p>

                <ul className="list-unstyled mt-2 ml-4">
                      <li className="py-2 ">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge className="badge-circle mr-3"
                              color="warning">
                              <i class="fa fa-cutlery" />
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0 text-white">Restaurante Gourmet y Tradicional</h5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge className="badge-circle mr-3"
                              color="white" >
                              <i className="ni ni-favourite-28" />
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0 text-white">Spa y Bienestar</h5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge className="badge-circle mr-3"
                              color="warning">
                              <i className="ni ni-user-run" />
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0 text-white">Gimnasio 24/7</h5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge className="badge-circle mr-3"
                              color="white" >
                              <i class="fa fa-sun-o"/>
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0 text-white">Vistas al mar</h5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge className="badge-circle mr-3"
                              color="warning">
                              <i className="ni ni-trophy" />
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0 text-white">Sercicios Exclusivos</h5>
                          </div>
                        </div>
                      </li>
                    </ul>

              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </>
    );
  }
}

export default Carousel;
