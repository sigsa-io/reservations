const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname,'..','public')));
app.set('port', 3003);

app.listen(app.get('port'));
console.log('Now listening on port', app.get('port'));