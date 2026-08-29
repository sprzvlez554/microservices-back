const express = require('express');
const axios = require('axios');

const config = require('../config');

const router = express.Router();

router.use('/customers', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${config.CUSTOMERS_URL}/customers${req.path === '/' ? '' : req.path}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Error comunicando con Customers',
            error: error.response?.data || error.message
        });
    }
});

router.use('/products', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${config.PRODUCTS_URL}/products${req.path === '/' ? '' : req.path}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Error comunicando con Products',
            error: error.response?.data || error.message
        });
    }
});

router.use('/shopping', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${config.SHOPPING_URL}/shopping${req.path === '/' ? '' : req.path}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Error comunicando con Shopping',
            error: error.response?.data || error.message
        });
    }
});

module.exports = router;
