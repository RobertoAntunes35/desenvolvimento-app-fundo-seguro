import Debts from '../model/Debts.js';

class DebtsRepository {
    async save(order) {
        try {
            return await Debts.create(order);
        } catch (err) {
            console.error(error.message);
            return null;
        }
    }
    async findById(id) {
        try {
            return await Debts.findById(id);
        } catch (err) {
            console.error(error.message);
            return null;
        }
    }
    async findAll() {
        try {
            return await Debts.find();
        } catch (err) {
            console.error(error.message);
            return null;
        }
    }
}

export default new DebtsRepository();