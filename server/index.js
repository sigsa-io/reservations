const path = require('path');
const express = require('express');
const morgan = require('morgan');
const router = require('./Route.js');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('port', 3003);

app.use('/', router);

app.listen(app.get('port'));
console.log('Now listening on port', app.get('port'));
