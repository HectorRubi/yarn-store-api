const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  sequelizeErrorHandler,
} = require('./middlewares/error.handler');

// Create Server
const app = express();
const port = 3000;

// Add middleware to allow express recieve data in JSON format
app.use(express.json());
app.use(cors());
app.use(helmet());

// Home page Doc
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Routes
routerApi(app);

// Middlewares
app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Running Server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on http:localhost:' + port);
});
