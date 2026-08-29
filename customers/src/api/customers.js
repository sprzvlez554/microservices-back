const express = require('express');
const CustomersService = require('../services/customers-service');

const router = express.Router();
const service = new CustomersService();

// =========================
// CRUD
// =========================

router.get('/', async (req, res, next) => {

    try {

        const { data } =
            await service.GetCustomers();

        return res.json(data);

    } catch (err) {

        next(err);

    }
});


router.get('/:id', async (req, res, next) => {

    try {

        const { data } =
            await service.GetCustomerById(req.params.id);

        return res.json(data);

    } catch (err) {

        next(err);

    }
});


router.post('/', async (req, res, next) => {

    try {

        const { data } =
            await service.CreateCustomer(req.body);

        return res.status(201).json(data);

    } catch (err) {

        next(err);

    }
});


router.put('/:id', async (req, res, next) => {

    try {

        const { data } =
            await service.UpdateCustomer(
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

        const { data } =
            await service.DeleteCustomer(req.params.id);

        return res.json(data);

    } catch (err) {

        next(err);

    }
});


// =========================
// AUTH
// =========================

router.post('/signup', async (req, res, next) => {

    try {

        const { data } =
            await service.Signup(req.body);

        return res.status(201).json(data);

    } catch (err) {

        next(err);

    }
});


router.post('/login', async (req, res, next) => {

    try {

        const { data } =
            await service.Login(req.body);

        return res.json(data);

    } catch (err) {

        next(err);

    }
});


router.get('/profile/:id', async (req, res, next) => {

    try {

        const { data } =
            await service.GetProfile(req.params.id);

        return res.json(data);

    } catch (err) {

        next(err);

    }
});


module.exports = router;
