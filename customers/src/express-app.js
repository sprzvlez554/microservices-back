const express = require('express');
const customers = require('./api/customers');
const HandleErrors = require('./utils/error-handler');

module.exports = async (app) => {
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));

    app.use('/customers', customers);

    // error handling
    app.use(HandleErrors);
}
