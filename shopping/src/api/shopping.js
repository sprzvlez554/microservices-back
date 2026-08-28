const express = require('express');
const ShoppingService = require('../services/shopping-service');

const router = express.Router();
const service = new ShoppingService();

router.get('/', async (req, res, next) => {
    try {
        const { data } = await service.GetShoppings();
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { data } = await service.GetShoppingById(req.params.id);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { data } = await service.CreateShopping(req.body);
        return res.status(201).json(data);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { data } = await service.UpdateShopping(
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
        const { data } = await service.DeleteShopping(req.params.id);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
