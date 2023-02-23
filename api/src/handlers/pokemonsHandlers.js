const {
    createPokemonDB,
    getPokemonById,
    getPokemonByName,
    getAllPokemons,
} = require('../controllers/PokemonsController');

const getPokemonsHandler = async (req, res) => {
    const { name } = req.query;
    const allPokesName = await getAllPokemons();
    try {
        if (name) {
            let poke = allPokesName.filter(
                (e) => e.name.toLowerCase() === name.toLowerCase()
            );
            poke.length
                ? res.status(200).send(poke)
                : res.status(404).send('Pokemon not found');
        } else {
            let pokemons = await getAllPokemons();
            return res.status(200).send(pokemons);
        }
    } catch (e) {
        console.log(e);
    }
};

const createPokemonHandler = async (req, res) => {
    const { name, id, hp, attack, defense, speed } = req.body;
    try {
        const response = await createPokemonDB({
            name,
            id,
            hp,
            attack,
            defense,
            speed,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'bdd' : 'api';

    try {
        const response = await getPokemonById(id, source);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPokemonsHandler,
    getDetailHandler,
    createPokemonHandler,
    getAllPokemons,
};
