const path = require('path');
const express = require('express');
const morgan = require('morgan');
const router = require('./Route.js');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('port', 3000);

app.use('/', router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(app.get('port'));
}
console.log('Now listening on port', app.get('port'));
module.exports = app;
