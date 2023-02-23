const { Router } = require('express');


const typeRouter = Router();

typeRouter.get('/', (req, res) => {
    res.status(200).send('Todos los types');
});


module.exports = typeRouter;
