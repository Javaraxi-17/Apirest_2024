const env = require('./env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorsAliases: false,
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Employee = require('../models/employee.models.js')(sequelize, Sequelize);
db.Product = require('../models/product.models.js')(sequelize, Sequelize);
db.Supplier = require('../models/supplier.models.js')(sequelize, Sequelize);
db.Music = require('../models/music.models.js')(sequelize, Sequelize);
db.Libro = require('../models/libro.model.js')(sequelize, Sequelize);
db.Libro = require('../models/curso.models.js')(sequelize, Sequelize);
db.Libro = require('../models/estudiante.models.js')(sequelize, Sequelize);
db.Libro = require('../models/notas.models.js')(sequelize, Sequelize);


module.exports = db;
