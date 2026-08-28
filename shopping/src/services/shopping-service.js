const { ShoppingRepository } = require('../database');
const { FormateData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class ShoppingService {

    constructor() {
        this.repository = new ShoppingRepository();
    }

    async GetShoppings() {
        try {
            const shoppings = await this.repository.FindAll();

            return FormateData({
                shoppings
            });

        } catch (err) {
            throw new APIError(
                'GetShoppingsError',
                500,
                err.message
            );
        }
    }

    async GetShoppingById(id) {
        try {
            const shopping = await this.repository.FindById(id);

            return FormateData(shopping);

        } catch (err) {
            if (err instanceof APIError) throw err;

            throw new APIError(
                'GetShoppingByIdError',
                500,
                err.message
            );
        }
    }

    async CreateShopping(data) {
        try {
            const shopping = await this.repository.CreateShopping(data);

            return FormateData(shopping);

        } catch (err) {
            throw new APIError(
                'CreateShoppingError',
                500,
                err.message
            );
        }
    }

    async UpdateShopping(id, data) {
        try {
            const shopping = await this.repository.UpdateShopping(
                id,
                data
            );

            return FormateData(shopping);

        } catch (err) {
            if (err instanceof APIError) throw err;

            throw new APIError(
                'UpdateShoppingError',
                500,
                err.message
            );
        }
    }

    async DeleteShopping(id) {
        try {
            const shopping = await this.repository.DeleteShopping(id);

            return FormateData(shopping);

        } catch (err) {
            if (err instanceof APIError) throw err;

            throw new APIError(
                'DeleteShoppingError',
                500,
                err.message
            );
        }
    }
}

module.exports = ShoppingService;
