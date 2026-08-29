const express = require('express');
const cors = require('cors');

const gatewayRoutes = require('./api/gateway');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/', gatewayRoutes);

module.exports = app;
