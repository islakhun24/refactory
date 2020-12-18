const db = require("../models");
const Room = db.room
const Booking = db.booking
const photoRoom = require("../middleware/photoRoom");
const { booking } = require("../models");
exports.addRoom = async (req,res) => {
    try {
        await photoRoom(req,res)
        Room.create({
            room_name: req.body.room_name,
            room_capacity: req.body.room_capacity,
            photo: req.file.originalname,
          })
            .then(user => {
                res.send({ message: "Room successfully created!" });
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
          }
      
          res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err.code}`,
          });  
    }
}


exports.roomAvailable = (req,res)=>{
    Room.findAll().then(rooms => {
        var array = []
        const room = rooms.map(async data =>{
            const room_id = data.id;
            const promiseBooking = await Booking.findOne({
                where:{
                    room_id:room_id
                }
            }).then(books=>{
                if(!books){
                    return {
                        status:0,
                        message:"tersedia",    
                        data
                    }
                }
                else{
                    return {
                        status:1,
                        message:"Tidak tersedia",    
                        data
                    }
                }
               
            })
            return promiseBooking
        })

        Promise.all(room).then(result=>{
            res.send(result)
        })
    })

  
    
}