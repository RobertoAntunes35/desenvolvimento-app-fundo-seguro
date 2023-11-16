import Credits from '../model/Credits.js'

class CreditsRepository {
    async save(order) {
        try {
            return await Credits.create(order);
        } catch (err) {
            console.error(error.message);
            return null;
        }
    }
    async findById(id) {
        try {
            return await Credits.findById(id);
        } catch (err) {
            console.error(error.message);
            return null;
        }
    }
    async findAll() {
        try {
            return await Credits.find();
        } catch (err) {
            console.error(error.message);
            return null;
        }
    }
}

export default new CreditsRepository();