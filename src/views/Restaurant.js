import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Restaurant = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [reservation, setReservation] = useState({
    date: '',
    time: '',
    people: '',
    comments: ''
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Usa useRef en lugar de una string ref
  const mainRef = useRef(null);

  useEffect(() => {
    // Obtener la información del restaurante
    axios.get('http://localhost:3002/api/restaurantInfo')
      .then(response => {
        setRestaurantInfo(response.data[0]); // Asumiendo que solo hay un registro
      })
      .catch(error => {
        console.error('Error fetching restaurant info:', error.message);
      });

    // Obtener los elementos del menú
    axios.get('http://localhost:3002/api/menuItems')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error.message);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/api/reservaRestaurante', {
      fecha: reservation.date,
      hora: reservation.time,
      numeroPersonas: reservation.people,
      comentarios: reservation.comments,
      restaurante_idrestaurante: 1 // Ajusta según el ID del restaurante
    })
    .then(response => {
      setConfirmationMessage('¡Reserva confirmada! Gracias por elegir nuestro restaurante.');
      setReservation({ date: '', time: '', people: '', comments: '' }); // Limpiar formulario
    })
    .catch(error => {
      console.error('Error al enviar la reserva:', error.message);
      setConfirmationMessage('Hubo un error al confirmar la reserva.');
    });
  };

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <section className="section pb-6 pt-8 text-white bg-gradient-warning  ">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="12">
                <h1 className='text-white display-2'>Bienvenidos a</h1>
                <p className='display-1'>{restaurantInfo.nombre}</p>
                <p className='h4'><strong>Horario de Funcionamiento: Lunes a Domingo, 11:00 AM - 10:00 PM</strong> </p>
              </Col>
            </Row>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        
        <Container>
        <Row className="my-5">
  {menuItems.map(item => (
    <Col xs="12" sm="6" md="4" lg="3" key={item.id} className="mb-4 d-flex justify-content-center">
      <Card className="shadow-sm border-light rounded">
        <CardImg
          top
          width="100%"
          src={item.urlFoto ? require(`assets/img/restaurante/${item.urlFoto}`) : require("assets/img/restaurante/default.jpg")}
          alt={`Imagen de ${item.nombre}`}
          className="img-fluid"
        />
        <CardBody>
          <CardTitle tag="h5" className="font-weight-bold h4">{item.nombre}</CardTitle>
          <CardText className="text-warning h5">
            <strong>Precio:</strong> ${item.precio.toFixed(2)}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  ))}
</Row>



          <section className="section section-lg pt-0">
            <Container>
              <Card className="bg-gradient-warning shadow-lg border-0">
                <div className="p-5">
                  <Row className="align-items-center bold-text">
                    <Col md="12" lg="8">
                      <h2 className='text-white '>Realiza tu Reserva</h2>
                      <Form className='text-white ' onSubmit={handleReservationSubmit}>
                        <FormGroup>
                          <Label for="date">Fecha</Label>
                          <Input type="date" name="date" id="date" value={reservation.date} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="time">Hora</Label>
                          <Input type="time" name="time" id="time" value={reservation.time} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="people">Número de Personas</Label>
                          <Input type="number" name="people" id="people" value={reservation.people} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="comments">Comentarios Especiales</Label>
                          <Input type="textarea" name="comments" id="comments" value={reservation.comments} onChange={handleInputChange} />
                        </FormGroup>
                      </Form>
                      
                    </Col>
                    <Col className="ml-lg-auto text-center " lg="3">
                      <Button block className="btn-white" color="default" size="lg"  onClick={handleReservationSubmit}>Confirmar Reserva</Button>
                    </Col>
                  </Row>
                  {confirmationMessage && (
                      <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                        <p className="h5 text-white"><strong>¡Éxito!</strong> {confirmationMessage}</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    )}

                </div>
              </Card>
            </Container>
          </section>
        </Container>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Restaurant;
