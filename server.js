const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Importar y usar las rutas
const customerRouter = require('./app/routers/router.js');
const productRouter = require('./app/routers/product.router.js');
const supplierRouter = require('./app/routers/supplier.router.js');
const musicRouter = require('./app/routers/music.router.js');
const libroRouter = require('./app/routers/libro.router.js');
const cursoRouter = require('./app/routers/curso.router.js');
const estudianteRouter = require('./app/routers/estudiante.router.js');
const notasRouter = require('./app/routers/notas.router.js');
const proyectoRouter = require('./app/routers/proyecto.router.js');



app.use('/', proyectoRouter);
app.use('/', customerRouter);
app.use('/', productRouter);
app.use('/', supplierRouter);
app.use('/', musicRouter);
app.use('/', libroRouter);
app.use('/', cursoRouter);
app.use('/', estudianteRouter);
app.use('/', notasRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Create a Server
const server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
