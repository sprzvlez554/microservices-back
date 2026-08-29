const { CustomerModel } = require('../models');
const { NotFoundError } = require('../../utils/app-errors');

class CustomerRepository {

    async FindAll() {
        return CustomerModel.find({});
    }

    async FindById(id) {
        const customer = await CustomerModel.findById(id);

        if (!customer) {
            throw new NotFoundError('Customer not found');
        }

        return customer;
    }

    async FindByEmail(email) {
        return CustomerModel.findOne({
            email: email.toLowerCase()
        });
    }

    async CreateCustomer(customer) {
        const newCustomer = new CustomerModel(customer);

        return newCustomer.save();
    }

    async UpdateCustomer(id, customer) {

        const updatedCustomer =
            await CustomerModel.findByIdAndUpdate(
                id,
                customer,
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            );

        if (!updatedCustomer) {
            throw new NotFoundError('Customer not found');
        }

        return updatedCustomer;
    }

    async DeleteCustomer(id) {

        const deletedCustomer =
            await CustomerModel.findByIdAndDelete(id);

        if (!deletedCustomer) {
            throw new NotFoundError('Customer not found');
        }

        return deletedCustomer;
    }
}

module.exports = CustomerRepository;
