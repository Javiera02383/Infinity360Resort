const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3002;


const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


// Configura Sequelize
const sequelize = new Sequelize('railway', 'root', 'PAxiCdPYJqQXMVqZYqQrQlSkBuXGzauX', {
    host: 'viaduct.proxy.rlwy.net',
    dialect: 'mysql',
    port: 22840,
});

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos MySQL');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.use(cors());
app.use(express.json());

// -----------------------------------------------------------------------------------------------------------------

// Ruta para obtener datos desde la vista de las Habitaciones del hotel
app.get('/api/habitaciones', async (req, res) => {
  try {
    const rooms = await sequelize.query('SELECT * FROM vwHabitaciones', { type: Sequelize.QueryTypes.SELECT });
    console.log(rooms); // Imprime los resultados para depuración
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching data:', error.message); // Mensaje de error
    console.error('Stack trace:', error.stack); // Stack trace para más detalles
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/habitaciones/disponibles', async (req, res) => {
  try {
    const availableRooms = await sequelize.query('SELECT * FROM vwHabitaciones WHERE estado = "Disponible"', { type: Sequelize.QueryTypes.SELECT });
    res.json(availableRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error.message);
    res.status(500).send('Error fetching available rooms');
  }
});

// -----------------------------------------------------------------------------------------------------------------
// Ruta para obtener datos
app.get('/api/personas', async (req, res) => {
  try {
    const personas = await sequelize.query("SELECT * FROM persona", { type: Sequelize.QueryTypes.SELECT });
    console.log(personas); // Imprime los resultados para depuración
    res.json(personas);
  } catch (error) {
    console.error('Error fetching data:', error.message); // Mensaje de error
    console.error('Stack trace:', error.stack); // Stack trace para más detalles
    res.status(500).send('Error fetching data');
  }
});

// -----------------------------------------------------------------------------------------------------------------
// Ruta para obtener datos
app.get('/api/reservas', async (req, res) => {
  try {
    const personas = await sequelize.query("SELECT * FROM reserva", { type: Sequelize.QueryTypes.SELECT });
    console.log(personas); // Imprime los resultados para depuración
    res.json(personas);
  } catch (error) {
    console.error('Error fetching data:', error.message); // Mensaje de error
    console.error('Stack trace:', error.stack); // Stack trace para más detalles
    res.status(500).send('Error fetching data');
  }
});


// Ruta para crear una nueva reserva
app.post('/api/reservas', async (req, res) => {
  const { fechaInicio, fechaFinal, fechaReserva, cliente_idcliente, tipoHabitacion, selectedServices } = req.body;
  try {
    // Obtener el precio de la habitación seleccionada
    const room = await sequelize.query('SELECT precioNoche FROM vwHabitaciones WHERE tipoNombre = :tipoHabitacion', {
      replacements: { tipoHabitacion },
      type: Sequelize.QueryTypes.SELECT
    });

    if (room.length === 0) {
      return res.status(400).json({ error: 'Tipo de habitación no encontrado' });
    }

    const roomPrice = room[0].precioNoche;

    // Calcular el costo de los servicios seleccionados
    let servicesCost = 0;
    if (selectedServices && selectedServices.length > 0) {
      const services = await sequelize.query(
        'SELECT SUM(subTotal) AS total FROM servicio WHERE idservicio IN (:servicesIds)',
        {
          replacements: { servicesIds: selectedServices },
          type: Sequelize.QueryTypes.SELECT
        }
      );
      servicesCost = services[0].total || 0;
    }

        // Calcular el subtotal
       const subtotal = Number(roomPrice) + Number(servicesCost);
    




    // Asignar un valor aleatorio entre 1 y 15 para flujoAprobacion_idflujoAprobacion
    const flujoAprobacion_idflujoAprobacion = Math.floor(Math.random() * 15) + 1;

    // Obtener o crear factura_idfactura
    let factura_idfactura;
    const lastFactura = await sequelize.query('SELECT MAX(idfactura) AS lastFactura FROM factura', {
      type: Sequelize.QueryTypes.SELECT
    });
    factura_idfactura = (lastFactura[0].lastFactura || 0) + 1;

    // Verificar si la factura existe
    const facturaExists = await sequelize.query('SELECT COUNT(*) AS count FROM factura WHERE idfactura = :factura_idfactura', {
      replacements: { factura_idfactura },
      type: Sequelize.QueryTypes.SELECT
    });

    if (facturaExists[0].count === 0) {
      // Crear una nueva factura si no existe
      await sequelize.query('INSERT INTO factura (idfactura, total, cliente_idcliente) VALUES (?, ?, ?)', {
        replacements: [factura_idfactura, subtotal, cliente_idcliente],
        type: Sequelize.QueryTypes.INSERT
      });
    } else {
      // Actualizar la factura existente con el subtotal y cliente_idcliente
      await sequelize.query('UPDATE factura SET total = ?, cliente_idcliente = ? WHERE idfactura = ?', {
        replacements: [subtotal, cliente_idcliente, factura_idfactura],
        type: Sequelize.QueryTypes.UPDATE
      });
    }

    // Asignar un valor aleatorio entre 1 y 15 para empleado_idempleado
    const empleado_idempleado = Math.floor(Math.random() * 15) + 1;

    const query = `
      INSERT INTO reserva 
      (fechaInicio, fechaFinal, fechaReserva, subtotal, flujoAprobacion_idflujoAprobacion, factura_idfactura, empleado_idempleado, cliente_idcliente) 
      VALUES (:fechaInicio, :fechaFinal, :fechaReserva, :subtotal, :flujoAprobacion_idflujoAprobacion, :factura_idfactura, :empleado_idempleado, :cliente_idcliente)`;

    // Valores a reemplazar en la consulta
      const replacements = {
        fechaInicio,
        fechaFinal,
        fechaReserva,
        subtotal,
        flujoAprobacion_idflujoAprobacion,
        factura_idfactura,
        empleado_idempleado,
        cliente_idcliente
      };

      // Ejecutar la consulta con los valores reemplazados
      const result = await sequelize.query(query, {
        replacements: replacements,
        type: Sequelize.QueryTypes.INSERT
      });

    // Obtener el ID de la reserva recién creada
    const reservaId = result[0] ? result[0][0] : null;

   res.status(201).json({ reservaId });

  } catch (error) {
    console.error('Error creating booking 2:', error.message);
    res.status(500).json({ error: 'Error creating booking 2' });
  }
});



// Ruta para obtener datos de los servicios para la pagina reserva
app.get('/api/servicios', async (req, res) => {
  try {
    // Obtén los servicios desde la base de datos usando Sequelize
    const servicios = await sequelize.query('SELECT * FROM servicio LIMIT 10', { type: Sequelize.QueryTypes.SELECT });
    res.json(servicios);
  } catch (error) {
    console.error('Error fetching servicios:', error.message);
    res.status(500).send('Error fetching servicios');
  }
});

// -----------------------------------------------------------------------------------------------------------------

// Ruta para obtener datos para los servicios de la pagina de services.js
app.get('/api/dservicios', async (req, res) => {
  try {
    const servicios = await sequelize.query('SELECT * FROM servicio ', { type: Sequelize.QueryTypes.SELECT });
    res.json(servicios);
  } catch (error) {
    console.error('Error fetching servicios:', error.message);
    res.status(500).send('Error fetching servicios');
  }
});

// -----------------------------------------------------------------------------------------------------------------

// Ruta para Crear una nueva persona y cliente
app.post('/api/clientes', async (req, res) => {
  try {
    const { pNombre, sNombre, pApellido, sApellido, pais, departamento, direccion, fechaNacimiento, correo, genero, fechaRegistro } = req.body;

    // Crear la persona
    const [personaResult] = await sequelize.query(
      'INSERT INTO persona (pNombre, sNombre, pApellido, sApellido, pais, departamento, direccion, fechaNacimiento, correo, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      { replacements: [pNombre, sNombre, pApellido, sApellido, pais, departamento, direccion, fechaNacimiento, correo, genero], type: Sequelize.QueryTypes.INSERT }
    );
    
    // Obtener el ID de la última inserción
    const result = await sequelize.query(
      'SELECT LAST_INSERT_ID() AS id',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idpersona = result[0].id;

    // Crear el cliente asociado a la persona
    await sequelize.query(
      'INSERT INTO cliente (fechaRegistro, persona_idpersona) VALUES (?, ?)',
      { replacements: [fechaRegistro, idpersona], type: Sequelize.QueryTypes.INSERT }
    );

    res.status(201).json({ message: 'Cliente creado exitosamente' });
  } catch (error) {
    console.error('Error creando cliente:', error.message);
    res.status(500).send('Error creando cliente');
  }
});

app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await sequelize.query(
      `SELECT c.idcliente, c.fechaRegistro, p.*
       FROM cliente c
       JOIN persona p ON c.persona_idpersona = p.idpersona`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    res.json(clientes);
  } catch (error) {
    console.error('Error obteniendo clientes:', error.message);
    res.status(500).send('Error obteniendo clientes');
  }
});

// Ruta para obtener datos de un cliente y la persona asociada
app.get('/api/clientes/:idcliente', async (req, res) => {
  try {
    const id = req.params.idcliente; // Asegúrate de que el parámetro se está extrayendo correctamente

    const cliente = await sequelize.query(
      `SELECT c.idcliente, c.fechaRegistro, p.*
       FROM cliente c
       JOIN persona p ON c.persona_idpersona = p.idpersona
       WHERE c.idcliente = ?`,
      { replacements: [id], type: Sequelize.QueryTypes.SELECT }
    );

    if (cliente.length === 0) {
      return res.status(404).send('Cliente no encontrado');
    }

    res.json(cliente);
  } catch (error) {
    console.error('Error obteniendo cliente:', error.message);
    res.status(500).send('Error obteniendo cliente');
  }
});



// Ruta para Actualizar datos de una persona y cliente
app.put('/api/clientes/:idcliente', async (req, res) => {
  try {
    const id = req.params.idcliente; // Asegúrate de que el parámetro se está extrayendo correctamente
    const { pNombre, sNombre, pApellido, sApellido, pais, departamento, direccion, fechaNacimiento, correo, genero, fechaRegistro } = req.body;

    // Obtener el id de la persona asociada al cliente
    const cliente = await sequelize.query('SELECT persona_idpersona FROM cliente WHERE idcliente = ?', 
                                          { replacements: [id], type: Sequelize.QueryTypes.SELECT });

    if (cliente.length === 0) {
      return res.status(404).send('Cliente no encontrado');
    }

    const idpersona = cliente[0].persona_idpersona;

    // Actualizar la tabla persona
    await sequelize.query(
      'UPDATE persona SET pNombre = ?, sNombre = ?, pApellido = ?, sApellido = ?, pais = ?, departamento = ?, direccion = ?, fechaNacimiento = ?, correo = ?, genero = ? WHERE idpersona = ?',
      { replacements: [pNombre, sNombre, pApellido, sApellido, pais, departamento, direccion, fechaNacimiento, correo, genero, idpersona] }
    );

    // Actualizar la tabla cliente
    await sequelize.query(
      'UPDATE cliente SET fechaRegistro = ? WHERE idcliente = ?',
      { replacements: [fechaRegistro, id] }
    );

    res.json({ message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando cliente:', error.message);
    res.status(500).send('Error actualizando cliente');
  }
});



// Ruta para eliminar un cliente y la persona asociada
app.delete('/api/clientes/:idcliente', async (req, res) => {
  try {
    const id = req.params.idcliente; // Asegúrate de que el parámetro se está extrayendo correctamente

    // Obtener el id de la persona asociada al cliente
    const cliente = await sequelize.query('SELECT persona_idpersona FROM cliente WHERE idcliente = ?',
                                          { replacements: [id], type: Sequelize.QueryTypes.SELECT });

    if (cliente.length === 0) {
      return res.status(404).send('Cliente no encontrado');
    }

    const idpersona = cliente[0].persona_idpersona;

    // Eliminar de la tabla cliente
    await sequelize.query('DELETE FROM cliente WHERE idcliente = ?', { replacements: [id] });

    // Eliminar de la tabla persona
    await sequelize.query('DELETE FROM persona WHERE idpersona = ?', { replacements: [idpersona] });

    res.json({ message: 'Cliente y persona eliminados exitosamente' });
  } catch (error) {
    console.error('Error eliminando cliente:', error.message);
    res.status(500).send('Error eliminando cliente');
  }
});

// -----------------------------------------------------------------------------------------------------------------

// Ruta para obtener la información del restaurante
app.get('/api/restaurantInfo', async (req, res) => {
  try {
    const restaurantInfo = await sequelize.query('SELECT * FROM restaurante', { type: Sequelize.QueryTypes.SELECT });
    res.json(restaurantInfo);
  } catch (error) {
    console.error('Error fetching restaurant info:', error.message);
    res.status(500).send('Error fetching restaurant info');
  }
});


// Ruta para crear una nueva reserva en reservaRestaurante
app.post('/api/reservaRestaurante', async (req, res) => {
  try {
    const { fecha, hora, numeroPersonas, comentarios, restaurante_idrestaurante } = req.body;

    // Insertar la nueva reserva en la tabla reservaRestaurante
    const [reservaResult] = await sequelize.query(
      'INSERT INTO reservaRestaurante (fecha, hora, numeroPersonas, comentarios, restaurante_idrestaurante) VALUES (?, ?, ?, ?, ?)',
      { replacements: [fecha, hora, numeroPersonas, comentarios, restaurante_idrestaurante], type: Sequelize.QueryTypes.INSERT }
    );

    // Obtener el ID de la última inserción
    const result = await sequelize.query(
      'SELECT LAST_INSERT_ID() AS id',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idreservaRestaurante = result[0].id;

    res.status(201).json({ message: 'Reserva creada exitosamente', id: idreservaRestaurante });
  } catch (error) {
    console.error('Error creando reserva:', error.message);
    res.status(500).send('Error creando reserva');
  }
});

// Ruta para obtener los platos del menú
app.get('/api/menuItems', async (req, res) => {
  try {
    const menuItems = await sequelize.query('SELECT * FROM plato', { type: Sequelize.QueryTypes.SELECT });
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error.message);
    res.status(500).send('Error fetching menu items');
  }
});

// -----------------------------------------------------------------------------------------------------------------

// Inicia el servidor
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});

