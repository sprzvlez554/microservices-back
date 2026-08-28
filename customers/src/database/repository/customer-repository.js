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

    async CreateCustomer(customer) {
        const newCustomer = new CustomerModel(customer);
        return newCustomer.save();
    }

    async UpdateCustomer(id, customer) {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
        id,
        customer,
        { returnDocument: 'after', runValidators: true }
    );

    if (!updatedCustomer) {
        throw new NotFoundError('Customer not found');
    }

    return updatedCustomer;
}
}

module.exports = CustomerRepository;
