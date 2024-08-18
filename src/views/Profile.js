import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Profile = () => {
  const mainRef = useRef(null);
  const [clientes, setClientes] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [formData, setFormData] = useState({
    fechaRegistro: '',
    idpersona: '',
    pNombre: '',
    sNombre: '',
    pApellido: '',
    sApellido: '',
    pais: '',
    departamento: '',
    direccion: '',
    fechaNacimiento: '',
    correo: '',
    genero: ''
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    // Cargar clientes desde la base de datos
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleClienteChange = async (e) => {
    const idcliente = e.target.value;
    setSelectedClienteId(idcliente);

    if (idcliente) {
      try {
        const response = await axios.get(`http://localhost:3002/api/clientes/${idcliente}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al cargar los datos del cliente:', error);
      }
    } else {
      setFormData({
        fechaRegistro: '',
        idpersona: '',
        pNombre: '',
        sNombre: '',
        pApellido: '',
        sApellido: '',
        pais: '',
        departamento: '',
        direccion: '',
        fechaNacimiento: '',
        correo: '',
        genero: ''
      });
    }
  };

  const handleShow = async () => {
    if (selectedClienteId) {
      try {
        const response = await axios.get(`http://localhost:3002/api/clientes/${selectedClienteId}`);
        const cliente = response.data[0]; // Acceder al primer elemento si la respuesta es un array
        setFormData(cliente);
        console.log('Datos del cliente:', cliente);
      } catch (error) {
        console.error('Error al cargar los datos del cliente:', error);
      }
    } else {
      console.log('No se ha seleccionado ningún cliente.');
    }
  };
  
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (selectedClienteId) {
        // Actualizar cliente existente
        response = await axios.put(`http://localhost:3002/api/clientes/${selectedClienteId}`, formData);
        console.log('Cliente actualizado:', response.data);
      } else {
        // Agregar nuevo cliente (no se incluye idcliente en el cuerpo)
        response = await axios.post('http://localhost:3002/api/clientes', formData);
        console.log('Cliente agregado:', response.data);
      }

      // Recargar la lista de clientes después de agregar o actualizar
      const updatedClientes = await axios.get('http://localhost:3002/api/clientes');
      setClientes(updatedClientes.data);
      setSelectedClienteId('');
      setFormData({
        fechaRegistro: '',
        idpersona: '',
        pNombre: '',
        sNombre: '',
        pApellido: '',
        sApellido: '',
        pais: '',
        departamento: '',
        direccion: '',
        fechaNacimiento: '',
        correo: '',
        genero: ''
      });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  const handleDeleteProfile = async () => {
    if (selectedClienteId) {
      try {
        await axios.delete(`http://localhost:3002/api/clientes/${selectedClienteId}`);
        console.log('Cliente eliminado');

        // Recargar la lista de clientes después de eliminar
        const updatedClientes = await axios.get('http://localhost:3002/api/clientes');
        setClientes(updatedClientes.data);
        setSelectedClienteId('');
        setFormData({
          fechaRegistro: '',
          idpersona: '',
          pNombre: '',
          sNombre: '',
          pApellido: '',
          sApellido: '',
          pais: '',
          departamento: '',
          direccion: '',
          fechaNacimiento: '',
          correo: '',
          genero: ''
        });
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };

  return (
    <>
      <DemoNavbar />
      <main className="profile-page" ref={mainRef}>
        <section className="section-profile-cover section-shaped my-0 " style={{ height: '450px' }}>
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

        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4 mb-3">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/Images/perfile.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Reservas
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Destinos
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">12</span>
                        <span className="description">Reservas</span>
                      </div>
                      <div>
                        <span className="heading">5</span>
                        <span className="description">Destinos</span>
                      </div>
                      <div>
                        <span className="heading">24</span>
                        <span className="description">Días</span>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="text-center mt-5 ">
                  <h3>
                    {`${formData.pNombre || 'Usuario'} ${formData.pApellido || ''}`}{' '}
                    <span className="font-weight-light">, {formData.pais || 'País'}</span>
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Email: {formData.correo || 'usuario@gmail.com'}
                  </div>
                </div>

              </div>

              <div className="px-4">
                <Row className="justify-content-center">
                  <Col lg="8">
                    <Form onSubmit={handleSubmit}>
                    <FormGroup className='bg-light mt-2'>
                            <Row className="align-items-center p-3">
                              <Col lg="9">
                                <Label for="clienteSelect">Seleccione un cliente</Label>
                                <Input type="select" name="clienteSelect" onChange={handleClienteChange}>
                                  <option value="">Nuevo Cliente</option>
                                  {clientes.map(cliente => (
                                    <option key={cliente.idcliente} value={cliente.idcliente}>
                                      {cliente.pNombre} {cliente.pApellido}
                                    </option>
                                  ))}
                                </Input>
                              </Col>
                              <Col lg="3" className="mt-2 mt-lg-0">
                                <Button
                                  color="primary"
                                  onClick={handleShow} // Asegúrate de que la función handleShow esté correctamente vinculada
                                >
                                  Mostrar
                                </Button>
                              </Col>
                            </Row>
                          </FormGroup>
                     
                      <Row><Col className='mt-4'>            
                          <FormGroup>
                        <Label for="fechaRegistro">Fecha de Registro</Label>
                        <Input
                          type="date"
                          name="fechaRegistro"
                          id="fechaRegistro"
                          value={formData.fechaRegistro}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="pNombre">Primer Nombre</Label>
                        <Input
                          type="text"
                          name="pNombre"
                          id="pNombre"
                          value={formData.pNombre}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="sNombre">Segundo Nombre</Label>
                        <Input
                          type="text"
                          name="sNombre"
                          id="sNombre"
                          value={formData.sNombre}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="pApellido">Primer Apellido</Label>
                        <Input
                          type="text"
                          name="pApellido"
                          id="pApellido"
                          value={formData.pApellido}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="sApellido">Segundo Apellido</Label>
                        <Input
                          type="text"
                          name="sApellido"
                          id="sApellido"
                          value={formData.sApellido}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="pais">País</Label>
                        <Input
                          type="text"
                          name="pais"
                          id="pais"
                          value={formData.pais}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      </Col> 
                      <Col className='mt-4'>
                      <FormGroup>
                        <Label for="departamento">Departamento</Label>
                        <Input
                          type="text"
                          name="departamento"
                          id="departamento"
                          value={formData.departamento}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="direccion">Dirección</Label>
                        <Input
                          type="text"
                          name="direccion"
                          id="direccion"
                          value={formData.direccion}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="fechaNacimiento">Fecha de Nacimiento</Label>
                        <Input
                          type="date"
                          name="fechaNacimiento"
                          id="fechaNacimiento"
                          value={formData.fechaNacimiento}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="correo">Correo</Label>
                        <Input
                          type="email"
                          name="correo"
                          id="correo"
                          value={formData.correo}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="genero">Género</Label>
                        <Input
                          type="select"
                          name="genero"
                          id="genero"
                          value={formData.genero}
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </Input>
                      </FormGroup>
                      </Col>
                      </Row>
                      <div className='m-5 text-center'>
                      <Button color="success" type="submit">
                        {selectedClienteId ? 'Actualizar' : 'Agregar'} Cliente
                      </Button>
                      {selectedClienteId && (
                        <Button
                          color="danger"
                          onClick={handleDeleteProfile}
                          className="float"
                        >
                          Eliminar
                        </Button>
                      )}</div>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Profile;
