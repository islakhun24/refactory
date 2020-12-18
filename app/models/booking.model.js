const User = require('./user.model');
const  Room = require('./room.model');
module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("bookings", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    room_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Room,
            key: "id"
        }
    },
    total_person: {
        type: Sequelize.INTEGER
      },
    booking_time: {
    type: Sequelize.DATE
    },
    noted: {
    type: Sequelize.TEXT
    },
    check_in_time: {
        type: Sequelize.DATE
        },
        check_out_time: {
            type: Sequelize.DATE
            },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
    })

    
    ;
   
    
        
    return Booking;
  };