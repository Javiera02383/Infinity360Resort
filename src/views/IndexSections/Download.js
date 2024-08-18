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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

class Download extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg ">
          <Container>
            <Row className="row-grid justify-content-center mt-2">
              <Col className="text-center" lg="8">
                 <h3 className="display-3">
                  Te esperamos{" "}
                  <span className="text-warning">
                  Encuéntranos Aquí
                  </span>
                </h3>
                <p className="lead ">
                  Calle Ejemplo 123, Barrio Ejemplo, Ciudad, País
                </p>
              </Col>
            </Row>
            
          </Container>
          <div className="map-container mt-4 mb-2">
                
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.608093852847!2d-122.39997268468182!3d37.7922817797564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d1d22d3b3%3A0x7d3c4a1234a63a7a!2sInfinity360%2C%20San%20Francisco%2C%20CA!5e0!3m2!1ses!2sus!4v1641824523146!5m2!1ses!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Mapa de Ubicación"
                ></iframe>
              </div>
        </section>
      </>
    );
  }
}

export default Download;
