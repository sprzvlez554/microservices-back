const express = require('express');
const CustomersService = require('../services/customers-service');

const router = express.Router();
const service = new CustomersService();

router.get('/', async (req, res, next) => {
    try {
        const { data } = await service.GetCustomers();
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { data } = await service.GetCustomerById(req.params.id);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { data } = await service.CreateCustomer(req.body);
        return res.status(201).json(data);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { data } = await service.UpdateCustomer(
            req.params.id,
            req.body
        );

        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { data } = await service.DeleteCustomer(req.params.id);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
