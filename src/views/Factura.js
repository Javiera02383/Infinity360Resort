import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const Factura = ({ reservaId }) => {
    const [factura, setFactura] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3002/api/factura/${reservaId}`)
            .then(response => {
                setFactura(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener la factura:', error);
            });
    }, [reservaId]);

    if (!factura) return <p>Cargando...</p>;

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="8">
                    <Card>
                        <CardBody>
                            <CardTitle>Factura</CardTitle>
                            <CardText>
                                <strong>Nombre del Cliente:</strong> {factura.nombreCliente}<br/>
                                <strong>Habitación:</strong> {factura.idHabitacion}<br/>
                                <strong>Fecha de Entrada:</strong> {factura.fecha_entrada}<br/>
                                <strong>Fecha de Salida:</strong> {factura.fecha_salida}<br/>
                                <strong>Noches:</strong> {factura.noches}<br/>
                                <strong>Precio por Noche:</strong> ${factura.precio_por_noche}<br/>
                                <strong>Total Habitación:</strong> ${factura.total_habitacion}<br/>
                                <strong>Total Servicios:</strong> ${factura.total_detalle}<br/>
                                <strong>Total a Pagar:</strong> ${factura.total_factura}<br/>
                            </CardText>
                            <Button color="success">Proceder al Pago</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Factura;
