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
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

class Labels extends React.Component {
  render() {
    return (
      <>
        <section className="section pb-0 mt-5 bg-gradient-warning ">
            <Container>
              <Row className="row-grid align-items-center">
                
                <Col className="order-lg-2 " lg="6">
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                        <i class="fa fa-bed text-primary" />
                      </div>
                    </div>
                    <div className="pl-4">
                      <h4 className="display-3 text-white">Habitaciones</h4>
                      <p className="text-white">
                      En Infinity360, nuestras habitaciones están diseñadas para ofrecerle el máximo a nuestros huespedes. 
                      Desde habitaciones estándar hasta suites de lujo, con espacios modernos.
           
                      </p>
                    </div>
                  </div>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i class="fa fa-check-square-o" />
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                          Confort Superior
                          </h5>
                          <p>Todas nuestras habitaciones están equipadas con camas de alta calidad, ropa de cama 
                          de lujo y una decoración elegante que asegura un ambiente relajante y acogedor.
                           </p>
                          <a
                            className="text-success"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-diamond" />
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-warning">
                          Servicios Exclusivos
                          </h5>
                          <p>
                          Disfrute de servicios exclusivos como el servicio de habitaciones 24/7, 
                          conexión Wi-Fi de alta velocidad, televisores de
                           pantalla plana y mini bares bien surtidos.
             
                          </p>
                          <a className="text-warning"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            Learn more
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-lg-1 ml-lg-auto" md="6">
                  <div className="position-relative pl-md-5">
                    <img alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/Images/slider2.png")}
                    />
                  </div>
                </Col>
              </Row>
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
      </>
    );
  }
}

export default Labels;
