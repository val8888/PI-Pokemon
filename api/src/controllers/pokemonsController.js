const { Pokemon, Type , cleanArray} = require('../db');
const axios = require('axios');
const url = 'https://pokeapi.co/api/v2/pokemon/'

const createPokemonDB = async (name, id, hp, attack, defense, speed) => {
    const newPokemon = await Pokemon.create(
        name,
        id,
        hp,
        attack,
        defense,
        speed
    );
    return newPokemon;
};

const getPokemonById = async (id, source) => {
    const pokemon =
        source === 'api'
            ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
            : await Pokemon.findByPk(id, {
                  include: { model: Type },
              });
    return pokemon;
};



const getPokemonByName = async (name) => {
    const pokemonDb = await Pokemon.findAll({ where: { name: name } });

    const infoApi = (
        await axios.get(`${url}/${id}`)
    ).data;

    const pokemonApi = infoCleaner(infoApi);
    const filteredPokemon = pokemonApi.filter(
        (element) => element.name === name
    );

    return [...pokemonDb, ...filteredPokemon];
};

const getAllPokemons = async () => {
    const pokemonDb = await Pokemon.findAll();

    const infoApi = await axios.get(`${url}`);

    const pokemonApi = cleanArray(infoApi);

    return [...pokemonDb, ...pokemonApi];
};

module.exports = {
    createPokemonDB,
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
};
