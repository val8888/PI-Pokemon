require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const cleanArray = (arr) =>
    arr.map((elem) => {
        return {
            id: elem.id,
            name: elem.name,
            hp: elem.stats[0].base_stat,
            attack: elem.stats[1].base_stat,
            defense: elem.stats[2].base_stat,
            speed: elem.stats[5].base_stat,
            height: elem.height ? elem.height : 0,
            weight: elem.weight ? elem.weight : 0,
            img: elem.sprites.other['official-artwork']['front_default'],
            type: elem.types
                ? elem.types
                      .map((ele) => ele.type.name)
                      .flat()
                      .sort()
                      .join(', ')
                : undefined,
            created: false,
        };
    });

const sequelize = new Sequelize(`postgres://postgres:admin@localhost/pokemon`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Pokemon.hasMany(Type);
Type.belongsTo(Pokemon);

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
    sequelize,
};
