import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, Alert } from 'reactstrap';
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Booking = () => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomType, setRoomType] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [roomTypes, setRoomTypes] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');

    useEffect(() => {
        // Hacer la solicitud al backend para obtener la lista de clientes
        axios.get('http://localhost:3002/api/clientes')
            .then(response => {
                setClientes(response.data); // Asumiendo que la respuesta es un array de clientes
            })
            .catch(error => {
                console.error('Error al obtener los clientes:', error);
            });
    }, []);

    // Actualizar el nombre, dirección y teléfono al seleccionar un cliente
    const handleClientChange = (event) => {
        const selectedId = event.target.value;
        const cliente = clientes.find(cliente => cliente.idcliente === parseInt(selectedId));
        setSelectedClient(selectedId);
        if (cliente) {
            setName(cliente.pNombre + ' ' + cliente.pApellido);
            setAddress(cliente.direccion || ''); // Suponiendo que `direccion` puede ser null o undefined
            setPhone(cliente.telefono || '');   // Suponiendo que `telefono` puede ser null o undefined
        }
    };

    useEffect(() => {
        // Obtener los tipos de habitación disponibles desde el backend
        axios.get('http://localhost:3002/api/habitaciones/disponibles')
            .then(response => {
                setRoomTypes(response.data);
                setAvailableRooms(response.data.filter(room => room.estado === 'Disponible'));
            })
            .catch(error => {
                console.error('Error fetching room types:', error);
            });
    }, []);

    useEffect(() => {
        // Obtener servicios disponibles desde el backend
        axios.get('http://localhost:3002/api/servicios')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
            });
    }, []);

    const handleServiceChange = (e) => {
        const serviceId = parseInt(e.target.id);
        if (e.target.checked) {
            setSelectedServices([...selectedServices, serviceId]);
        } else {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const bookingData = {
            fechaInicio: checkInDate,
            fechaFinal: checkOutDate,
            fechaReserva: new Date().toISOString().slice(0, 10),
            estado: null, // Puedes ajustar este valor si es necesario
            flujoAprobacion_idflujoAprobacion: null,
            factura_idfactura: null,
            empleado_idempleado: null,
            cliente_idcliente: parseInt(selectedClient),
            tipoHabitacion: roomType,
            selectedServices: selectedServices, // Debes manejar cómo guardar y procesar estos servicios
            nombre: name,
            direccion: address,
            telefono: phone,
            numeroHuespedes: guests
        };
    
        // Enviar bookingData al backend
        axios.post('http://localhost:3002/api/reservas', bookingData)
            .then(response => {
                console.log('Reserva creada con éxito:', response.data);
                setBookingConfirmed(true);
            })
            .catch(error => {
                console.error('Error al crear la reserva:', error);
            });
    };

    return (
        <>
            <DemoNavbar />
            <main className="">


                <section className="section-profile-cover section-shaped my-0 " style={{ height: '350px' }}>
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
               <Container>
                        <Row className="section pb-6 pt-8 row-grid align-items-center">
                            <Col md="12">
                                <h1 className='text-white display-1'>Reservar una Habitación</h1>
                                <p className='text-white display-4'>Aprovecha nuestros servicios VIP</p>
                            </Col>
                        </Row>
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


                
                <Container className="mt-4 mb-6 bg-white card-profile shadow" >
                    <Row>
                        <Col md="9" className="mx-auto">
                            {!bookingConfirmed ? (
                                <Form onSubmit={handleSubmit}>
                                    <Row><Col className='mt-5'>    
                                    <FormGroup>
                                        <Label for="checkInDate">Fecha de Entrada</Label>
                                        <Input
                                            type="date"
                                            name="checkInDate"
                                            id="checkInDate"
                                            value={checkInDate}
                                            onChange={(e) => setCheckInDate(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="checkOutDate">Fecha de Salida</Label>
                                        <Input
                                            type="date"
                                            name="checkOutDate"
                                            id="checkOutDate"
                                            value={checkOutDate}
                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="roomType">Tipo de Habitación</Label>
                                        <Input
                                            type="select"
                                            name="roomType"
                                            id="roomType"
                                            value={roomType}
                                            onChange={(e) => setRoomType(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione una opción</option>
                                            {roomTypes.map((type, index) => (
                                                <option key={index} value={type.tipoNombre}>
                                                    {`${type.tipoNombre} - $${type.precioNoche}`}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="guests">Número de Huéspedes</Label>
                                        <Input
                                            type="number"
                                            name="guests"
                                            id="guests"
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    </Col>
                                    <Col className='mt-5'>
                                    <FormGroup>
                                        <Label for="cliente">Seleccionar Cliente</Label>
                                        <Input
                                            type="select"
                                            name="cliente"
                                            id="cliente"
                                            value={selectedClient}
                                            onChange={handleClientChange}
                                            required
                                        >
                                            <option value="">Seleccione un cliente</option>
                                            {clientes.map((cliente) => (
                                                <option key={cliente.idcliente} value={cliente.idcliente}>
                                                    {cliente.pNombre} {cliente.pApellido}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="address">Dirección</Label>
                                        <Input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                            readOnly // Si no deseas que sea editable
                                        />
                                    </FormGroup>
 
                                    <FormGroup>
                                        <Label for="services">Servicios Extra</Label>
                                        <Row>
                                            {services.map((service, index) => (
                                                <Col xs="6" key={service.idservicio}>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input
                                                                type="checkbox"
                                                                id={service.idservicio}
                                                                onChange={handleServiceChange}
                                                            />
                                                            {service.nombre} (${service.subTotal})
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            ))}
                                        </Row>
                                    </FormGroup>
                                    </Col>
                                     </Row>
                                     <Container className="mt-4">
                                            <Row className="justify-content-center">
                                                <Col md="6" className="text-center">
                                                 <Button type="submit" color="primary " className="btn-lg p-3 mb-5  shadow-sm">Confirmar Reserva</Button>
                                                </Col> 
                                            </Row>
                                        </Container>
                                </Form>

                            ) : (
                                <Card>
                                    <CardBody>
                                    <Alert color="default m-4 pl-9">
                                            
                                            <h6 className="alert-heading m-4"><span className="alert-inner--icon">
                                                <i className="ni ni-like-2" />
                                            </span>Reserva Confirmada</h6>
                                            <p className='h5 text-white'><strong>Fecha de Entrada:</strong> {checkInDate}</p>
                                            <p className='h5 text-white'><strong>Fecha de Salida:</strong> {checkOutDate}</p>
                                            <p className='h5 text-white'><strong>Tipo de Habitación:</strong> {roomType}</p>
                                            <p className='h5 text-white'><strong>Número de Huéspedes:</strong> {guests}</p>
                                            <p className='h5 text-white'><strong>Cliente:</strong> {name}</p>
                                            <p className='h5 text-white'><strong>Dirección:</strong> {address}</p>
                                            <p className='h5 text-white'><strong>Servicios:</strong> {selectedServices.join(', ')}</p>
                                        </Alert>
                                    </CardBody>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>
                <section className="section-profile-cover section-shaped my-0 " style={{ height: '150px' }}>
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
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

    <section className="section pb-6 pt-6 text-dark ">
      <Container>
        <Row className="row-grid align-items-center">
          
            <h2 className="text-primary display-4">Políticas de Reserva y Cancelación</h2>
            <p className="lead">
              Bienvenidos a nuestro hotel. Nos complace ofrecerle una estancia cómoda y placentera. Para garantizar una experiencia fluida y sin problemas, a continuación detallamos nuestras políticas de reserva y cancelación:
            </p>
            <Col md="6">
            <h3 className="text-default mt-4">Política de Reservas</h3>
            <ul className="pl-4">
              <li>Todas las reservas deben ser garantizadas con una tarjeta de crédito válida.</li>
              <li>El check-in es a partir de las 3:00 PM y el check-out es hasta las 12:00 PM.</li>
              <li>Las solicitudes especiales están sujetas a disponibilidad y pueden aplicarse cargos adicionales.</li>
            </ul>
            <h3 className="text-default mt-4">Política de No Presentación</h3>
            <ul className="pl-4">
              <li>En caso de no presentarse sin previo aviso, se cargará el importe de una noche de estancia a la tarjeta de crédito proporcionada.</li>
            </ul>
          </Col>
          <Col md="6">
            <h3 className="text-default mt-4 ">Política de Cancelación</h3>
            <ul className="pl-4">
              <li>Las cancelaciones realizadas hasta 48 horas antes de la fecha de llegada no incurrirán en cargos.</li>
             <li>En caso de salida anticipada, se cobrará el 50% del valor de las noches restantes.</li>
            </ul>
            <h3 className="text-default mt-4">Modificaciones de la Reserva</h3>
            <ul className="pl-4">
              <li>Las modificaciones de la reserva están sujetas a disponibilidad y pueden incurrir en cargos adicionales.</li>
              <li>Para modificar su reserva, por favor contacte a nuestro equipo de reservas al menos 48 horas antes de su llegada.</li>
            </ul>
            </Col>
            <p className="mt-4">
              Para cualquier duda o aclaración adicional, no dude en ponerse en contacto con nuestro equipo de atención al cliente. Agradecemos su comprensión y colaboración.
            </p>
          
        </Row>
      </Container>
    </section>


            </main>
            <SimpleFooter />
        </>
    );
};

export default Booking;
