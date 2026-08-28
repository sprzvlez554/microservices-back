const { ShoppingModel } = require('../models');
const { NotFoundError } = require('../../utils/app-errors');

class ShoppingRepository {

    async FindAll() {
        return ShoppingModel.find({});
    }

    async FindById(id) {
        const shopping = await ShoppingModel.findById(id);

        if (!shopping) {
            throw new NotFoundError('Shopping not found');
        }

        return shopping;
    }

    async CreateShopping(shopping) {
        const newShopping = new ShoppingModel(shopping);
        return newShopping.save();
    }

    async UpdateShopping(id, shopping) {
        const updatedShopping = await ShoppingModel.findByIdAndUpdate(
            id,
            shopping,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!updatedShopping) {
            throw new NotFoundError('Shopping not found');
        }

        return updatedShopping;
    }

    async DeleteShopping(id) {
        const deletedShopping = await ShoppingModel.findByIdAndDelete(id);

        if (!deletedShopping) {
            throw new NotFoundError('Shopping not found');
        }

        return deletedShopping;
    }
}

module.exports = ShoppingRepository;
