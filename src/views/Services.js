import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Card, CardBody, CardImg, CardTitle, CardText, Button } from 'reactstrap';
import axios from 'axios';
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { Link } from "react-router-dom";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        getServices();
    }, []);

    const getServices = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/dservicios');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error.message);
        }
    };

    return (
        <>
            <DemoNavbar />
            <main>
                <div className="position-relative">
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
                                    <Col lg="6">
                                        <h1 className='text-white display-1'>
                                            Servicios del Hotel
                                        </h1>
                                        <p className="lead text-white">
                                            Descubre los servicios adicionales que ofrecemos para enriquecer tu experiencia durante tu estancia.
                                        </p>
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
                </div>
                <section className="section section-lg pt-lg-0 mt--200">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg="12">
                                <Row className="row-grid">
                                    {services.map(service => (
                                        <Col lg="4" key={service.idservicio} className="mb-4">
                                            <Card className="card-lift--hover shadow border-0">
                                                
                                                <CardImg
                                                    top width="100%"
                                                    src={service.image ? require(`assets/img/servicios/${service.image}`) : require("assets/img/servicios/default.jpg")}
                                                    alt={`Imagen de ${service.nombre}`}
                                                    />  
                                                <CardBody className="py-5">
                                                    <div className={`icon icon-shape icon-shape-${service.idservicio === 2 ? 'primary' : service.idservicio === 5 ? 'success' : service.idservicio === 8 ? 'warning' : service.idservicio === 11 ? 'primary' : service.idservicio === 14 ? 'success' : service.idservicio === 17 ? 'warning' :'info'} rounded-circle mb-4`}>
                                                        <i className={`ni ni-shop }`} />
                                                    </div>
                                                    <h6 className={`text-${service.idservicio === 2 ? 'primary' : service.idservicio === 5 ? 'success' : service.idservicio === 8 ? 'warning' : service.idservicio === 11 ? 'primary' : service.idservicio === 14 ? 'success' : service.idservicio === 17 ? 'warning' :'info'} text-uppercase`}>
                                                        {service.nombre}
                                                    </h6>
                                                    <p className="description mt-3">
                                                        {service.descripcion}
                                                    </p>
                                                    <p className="description mt-3">
                                                        <strong>Horario:</strong> 24/7
                                                    </p>
                                                    <p className="description mt-3">
                                                        <strong>Precio:</strong> {service.subTotal}
                                                    </p>
                                                    <Button
                                                        
                                                        className="mt-4"
                                                        color={service.idservicio === 2 ? 'primary' : service.idservicio === 5 ? 'success' : service.idservicio === 8 ? 'warning' : service.idservicio === 11 ? 'primary' : service.idservicio === 14 ? 'success' : service.idservicio === 17 ? 'warning' :'info'}
                                                        to="/booking-page" tag={Link}
                                                      
                                                    >
                                                        Reservar
                                                    </Button>
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

export default Services;
