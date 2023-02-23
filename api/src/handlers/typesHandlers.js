const { createTypeDb } = require('../controllers/typesController');

const createTypeHandler = async (req, res) => {
    const { name, id } = req.body;
    try {
        const response = await createTypeDb(name, id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTypeHandler };
