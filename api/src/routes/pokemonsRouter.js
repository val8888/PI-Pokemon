const { Router } = require('express');

const pokemonsRouter = Router();

const {
    getDetailHandler,
    getPokemonsHandler,
    createPokemonHandler,
} = require('../handlers/pokemonsHandlers');

pokemonsRouter.get('/:id', getDetailHandler);

pokemonsRouter.get('/', getPokemonsHandler);

pokemonsRouter.post('/', createPokemonHandler);

module.exports = pokemonsRouter;
