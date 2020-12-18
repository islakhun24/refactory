module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING
      },
    password: {
    type: Sequelize.STRING
    },
    photo: {
    type: Sequelize.STRING
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
    });
  
    return User;
  };