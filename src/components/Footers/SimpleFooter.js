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
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>

            <Row className=" row-grid align-items-center mb-5">

              <Col lg="6" >
                <h4 className=" text-primary font-weight-light mb-2">
                Infinity360, donde el lujo y la comodidad se encuentran en perfecta armonía!
                </h4>
                <h5 className=" mb-0 font-weight-light">
                Disfruta de nuestras habitaciones exquisitas, servicios de primera clase y una experiencia inolvidable.
                
                </h5>
              </Col>

              {/* Enlaces Rápidos */}
              <Col md="3" className="mb-3">
                <h6 className="text-primary">Enlaces Rápidos</h6>
                <ul className="list-unstyled">
                  <li><a href="/" className="text-default">Inicio</a></li>
                  <li><a href="/rooms-page" className="text-default">Habitaciones</a></li>
                  <li><a href="/booking-page" className="text-default">Reservar</a></li>
                  <li><a href="/services-page" className="text-default">Servicios</a></li>
                  <li><a href="/restaurant-page" className="text-default">Restaurante</a></li>
                  <li><a href="/profile-page" className="text-default">Perfil</a></li>
                  {/*<li><a href="/contact-page" className="text-default">Contacto</a></li>*/}
                </ul>
              </Col>

              {/* Información del Hotel */}
              <Col md="3" className="mb-3">
                <h6 className="text-primary">Información</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="tel:+123456789" className="text-default">Teléfono: +123 456 789</a>
                  </li>
                  <li>
                    <a href="mailto:info@infinity360.com" className="text-default">Email: info@infinity360.com</a>
                  </li>
                  <li>
                    <a href="https://www.google.com/maps/place/Infinity360" target="_blank" rel="noopener noreferrer" className="text-default">Dirección: Calle Ejemplo 123, Ciudad, País</a>
                  </li>
                </ul>
              </Col>
              
             
              <Col className="text-lg-center btn-wrapper mt-2" lg="2">
                <Button
                  className="btn-icon-only rounded-circle"
                  color="instagram"
                  href="https://instagram.com/"
                  id="tooltip475038074"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-instagram" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip475038074">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.facebook.com/"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-facebook-square" />
                  </span>
                </Button>
                                
              </Col>
            </Row>
            
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">
                  © {new Date().getFullYear()}{" "}
                  <a href="/" className="text-black">Infinity360</a>. Todos los derechos reservados.
                </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink href="/" className="text-Success">Inicio</NavLink>
                  </NavItem>
                 
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>









      </>
    );
  }
}

export default SimpleFooter;
