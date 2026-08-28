const { CustomerRepository } = require('../database');
const { FormateData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class CustomersService {
    constructor() {
        this.repository = new CustomerRepository();
    }

    async GetCustomers() {
        try {
            const customers = await this.repository.FindAll();
            return FormateData({ customers });
        } catch (err) {
            throw new APIError('GetCustomersError', 500, err.message);
        }
    }

    async GetCustomerById(id) {
        try {
            const customer = await this.repository.FindById(id);
            return FormateData(customer);
        } catch (err) {
            if (err instanceof APIError) throw err;
            throw new APIError('GetCustomerByIdError', 500, err.message);
        }
    }

    async CreateCustomer(customer) {
        try {
            const newCustomer = await this.repository.CreateCustomer(customer);
            return FormateData(newCustomer);
        } catch (err) {
            throw new APIError('CreateCustomerError', 500, err.message);
        }
    }

    async UpdateCustomer(id, customer) {
        try {
            const updatedCustomer = await this.repository.UpdateCustomer(id, customer);
            return FormateData(updatedCustomer);
        } catch (err) {
            if (err instanceof APIError) throw err;
            throw new APIError('UpdateCustomerError', 500, err.message);
        }
    }

    async DeleteCustomer(id) {
        try {
            const deletedCustomer = await this.repository.DeleteCustomer(id);
            return FormateData(deletedCustomer);
        } catch (err) {
            if (err instanceof APIError) throw err;
            throw new APIError('DeleteCustomerError', 500, err.message);
        }
    }
}

module.exports = CustomersService;
