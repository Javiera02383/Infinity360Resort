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
import { Button, Container, Row, Col } from "reactstrap";

class Description extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg section-nucleo-icons pb-120">
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow rounded-circle mb-2 mr-2 text-white">
              <i class="fa fa-star text-white" />
              </div>
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow rounded-circle mb-2 mr-2 text-white">
              <i class="fa fa-star text-white" />
              </div>
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow rounded-circle mb-2 mr-2 text-white">
              <i class="fa fa-star text-white" />
              </div>
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow rounded-circle mb-2 mr-2 text-white">
              <i class="fa fa-star text-white" />
              </div>
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow rounded-circle mb-2 mr-2 text-white">
              <i class="fa fa-star text-white" />
              </div>

                <h2 className="display-3">Hotel 5 Estrellas para ti y tu Familia</h2>
                <p className="lead">
                Bienvenido a <span className="h5 text-fluit">Infinity360</span>, un refugio de lujo donde el confort y la elegancia se combinan para 
                ofrecerle una experiencia inolvidable. Nuestro hotel, situado en el corazón de la ciudad, ofrece 
                habitaciones exquisitamente diseñadas, un servicio impecable y una variedad de comodidades para 
                que su estancia sea perfecta.
                </p>
                
              </Col>
            </Row>
            
          </Container>
        </section>

        


      </>
    );
  }
}

export default Description;
