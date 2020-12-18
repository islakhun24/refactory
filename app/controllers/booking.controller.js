const { room } = require("../models");
const db = require("../models");
const Booking = db.booking
const Room = db.room
const User = db.user
const {send} = require('../util/email_sender')
exports.booking_room = async (req,res) => {
    const user_id = req.userId
    const {room_id, total_person, booking_time, noted} = req.body
    const user = await User.findByPk(user_id);
    const roomss = await Room.findByPk(room_id);

    Room.findByPk(room_id).then(room=>{
        if(room.room_capacity < total_person){
            res.status(500).send({ message: "Kapasitas terlalu banyak" });
        }
        Booking.create({
                user_id: user_id,
                room_id:room_id,
                total_person:total_person,
                booking_time:booking_time,
                noted:noted
            }).then(booking => {
                const from = '"Boo-kings.id" <foo@example.com>'; // sender address
                const to = user.email; // list of receivers
                const subject = "Booking Room"; // Subject line
                const text = "Thank you for booking ..."; // plain text body
                const html = "<b>"+roomss.room_name+"</b>";
                send(from,to,subject,text,html)
                res.send({ message: "Booking successfully created!" ,
                data:booking
                });
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
      })
}

exports.cekin = async (req, res) =>{
    const {cekin} = req.body
    const {id} = req.params

    const user_id = req.userId
    console.log(id,cekin);
    const user = await User.findByPk(user_id);
    Booking.update(
        {check_in_time: cekin, updated_at:new Date()},
        {returning: true, where: {id: id} }
      ).then(count=> {
        const from = '"Boo-kings.id" <foo@example.com>'; // sender address
        const to = user.email; // list of receivers
        const subject = "Checkin Room"; // Subject line
        const text = "Thank you for check in ..."; // plain text body
        const html = "at <b>"+cekin+"</b>";
        send(from,to,subject,text,html)
        
        res.send(
            { 
                message: "Check in successfull"
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}