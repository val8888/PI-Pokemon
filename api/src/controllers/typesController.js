const { Type } = require('../db');

const createTypeDb = async (name, id) => {
    const newType = await Type.create({ name });

    await newType.setPokemon(pokemonId);

    return newType;
};

module.exports = { createTypeDb };
