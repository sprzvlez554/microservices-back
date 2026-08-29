const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

            return FormateData({
                customers
            });

        } catch (err) {
            throw new APIError(
                'GetCustomersError',
                500,
                err.message
            );
        }
    }

    async GetCustomerById(id) {
        try {
            const customer = await this.repository.FindById(id);

            return FormateData(customer);

        } catch (err) {
            if (err instanceof APIError) {
                throw err;
            }

            throw new APIError(
                'GetCustomerByIdError',
                500,
                err.message
            );
        }
    }

    async CreateCustomer(customer) {
        try {
            const newCustomer = await this.repository.CreateCustomer(
                customer
            );

            return FormateData(newCustomer);

        } catch (err) {
            throw new APIError(
                'CreateCustomerError',
                500,
                err.message
            );
        }
    }

    async UpdateCustomer(id, customer) {
        try {
            const updatedCustomer =
                await this.repository.UpdateCustomer(id, customer);

            return FormateData(updatedCustomer);

        } catch (err) {
            if (err instanceof APIError) {
                throw err;
            }

            throw new APIError(
                'UpdateCustomerError',
                500,
                err.message
            );
        }
    }

    async DeleteCustomer(id) {
        try {
            const deletedCustomer =
                await this.repository.DeleteCustomer(id);

            return FormateData(deletedCustomer);

        } catch (err) {
            if (err instanceof APIError) {
                throw err;
            }

            throw new APIError(
                'DeleteCustomerError',
                500,
                err.message
            );
        }
    }

    // =========================
    // SIGNUP
    // =========================

    async Signup({ email, password, phone, name }) {

        if (!email || !password) {
            throw new APIError(
                'ValidationError',
                400,
                'Email and password are required'
            );
        }

        const existingCustomer =
            await this.repository.FindByEmail(email);

        if (existingCustomer) {
            throw new APIError(
                'EmailAlreadyRegistered',
                400,
                'Email already registered'
            );
        }

        const passwordHash =
            await bcrypt.hash(password, 10);

        const customer =
            await this.repository.CreateCustomer({
                name: name || email,
                email,
                passwordHash,
                phone
            });

        const token = jwt.sign(
            {
                id: customer._id.toString(),
                email: customer.email
            },
            process.env.JWT_SECRET || 'development-secret',
            {
                expiresIn: '1d'
            }
        );

        return FormateData({
            customer: {
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address
            },
            token
        });
    }

    // =========================
    // LOGIN
    // =========================

    async Login({ email, password }) {

        if (!email || !password) {
            throw new APIError(
                'ValidationError',
                400,
                'Email and password are required'
            );
        }

        const customer =
            await this.repository.FindByEmail(email);

        if (!customer || !customer.passwordHash) {
            throw new APIError(
                'InvalidCredentials',
                401,
                'Invalid credentials'
            );
        }

        const validPassword =
            await bcrypt.compare(
                password,
                customer.passwordHash
            );

        if (!validPassword) {
            throw new APIError(
                'InvalidCredentials',
                401,
                'Invalid credentials'
            );
        }

        const token = jwt.sign(
            {
                id: customer._id.toString(),
                email: customer.email
            },
            process.env.JWT_SECRET || 'development-secret',
            {
                expiresIn: '1d'
            }
        );

        return FormateData({
            customer: {
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address
            },
            token
        });
    }

    // =========================
    // PROFILE
    // =========================

    async GetProfile(id) {

        const customer =
            await this.repository.FindById(id);

        return FormateData({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address
        });
    }
}

module.exports = CustomersService;
