import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Badge, Card, CardBody, CardImg, Button } from 'reactstrap';
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);


  
  useEffect(() => {
    axios.get('http://localhost:3002/api/habitaciones')
      .then(response => {
        setRooms(response.data);
        setAvailableRooms(response.data.filter(room => room.estado === 'Disponible'));
      })
      .catch(error => {
        console.error('Hubo un error al obtener las habitaciones:', error);
      });
  }, []);

  const handleShowAvailable = () => {
    setShowAvailable(true);
  };

  const handleShowAll = () => {
    setShowAvailable(false);
  };
  

  
  return (
    <>

    
      <DemoNavbar />
      <main>
        <section className="section section-lg section-shaped pb-250">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="8">
                  <h6 className="display-1">Nuestras Habitaciones</h6>
                  <h1 className="display-4 text-white mb-4">
                    Descubre nuestras habitaciones de lujo, diseñadas para ofrecerte la máxima comodidad y relajación.
                  </h1>
                  <div className="btn-wrapper">
                    <Button
                      className="btn-icon mb-3 mb-sm-0"
                      color="info"
                      onClick={handleShowAvailable}
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fa fa-bed" />
                      </span>
                      <span className="btn-inner--text">Ver Habitaciones Disponibles</span>
                    </Button>
                    <Button
                      className="btn-icon mb-3 mb-sm-0"
                      color="info"
                      onClick={handleShowAll}
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fa fa-bed" />
                      </span>
                      <span className="btn-inner--text">Ver Todas las Habitaciones</span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew">
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

        <section id="rooms" className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  {(showAvailable ? availableRooms : rooms).map(room => (
                    
                    <Col lg="4" key={room.idHabitacion} className="mb-4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardImg
                          top width="100%"
                          src={room.image ? require(`assets/img/habitaciones/${room.image}`) : require("assets/img/habitaciones/default.jpg")}
                          alt={`Imagen de ${room.tipoNombre}`}
                          />               
                        <CardBody className="py-5">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="pr-6">
                              <h5 className="text-primary text-uppercase">{room.tipoNombre}</h5>
                              <p className="description mt-3">{room.descripcion}</p>
                              <div>
                                <Badge color="primary" pill className="mr-1">Lujo</Badge>
                                <Badge color="primary" pill className="mr-1">Relax</Badge>
                              </div>
                            </div>
                            <div>
                              <p className="mb-0"><strong>Número: </strong>{room.numeroHabitacion}</p>
                              <p className="mb-0 "><strong>Precio: </strong>${room.precioNoche}/noche</p>
                              <p className={`mb-0 mt-2 text-${room.estado === 'Disponible' ? 'success' : 'danger'}`}><strong>{room.estado}</strong></p>
                            </div>
                          </div>
                          <Button className="mt-4 align-right" color="primary" to="/booking-page" tag={Link}>Reservar</Button>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Rooms;

