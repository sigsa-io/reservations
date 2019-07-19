const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const router = require('./Route.js');
const expressStaticGzip = require('express-static-gzip');


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/:restaurantId/reservations', expressStaticGzip(path.resolve(__dirname, '..', 'public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
     res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}));

app.use(expressStaticGzip(path.resolve(__dirname, '..', 'public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
     res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}));

app.set('port', 3003);

app.use('/', router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(app.get('port'));
}
console.log('Now listening on port', app.get('port'));
module.exports = app;
