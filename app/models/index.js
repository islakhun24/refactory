const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    define: {
        timestamps: false
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.op = Sequelize.Op; 
db.user = require("../models/user.model.js")(sequelize, Sequelize);
// db.booking = require("../models/booking.model.js")(sequelize, Sequelize);
db.room = require("../models/room.model.js")(sequelize, Sequelize);
db.booking = require("../models/booking.model.js")(sequelize, Sequelize);

module.exports = db;