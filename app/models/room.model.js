module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("rooms", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    room_name: {
        type: Sequelize.STRING
      },
    room_capacity: {
    type: Sequelize.INTEGER
    },
    photo: {
    type: Sequelize.STRING
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
    });
  
    return Room;
  };