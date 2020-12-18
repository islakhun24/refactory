

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var moment = require('moment');
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const {send} = require('./app/util/email_sender')
global.__basedir = __dirname;
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const { sequelize, Sequelize } = require("./app/models");

db.sequelize.sync();
const Booking = db.booking;
const User = db.user;
const Op = db.op

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/room.routes')(app);
require('./app/routes/booking.routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});






//SEND EMAIL WHEN DATE = BOOKING_TIME -> REFRESH EVERY 1 MINUTE

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    
    Booking.findAll({
        where:{
           booking_time : { 
            [Op.gt]: TODAY_START,
            [Op.lt]: NOW
          },
          deleted_at:null
        }
    }).then( datas=>{
        datas.map(async data =>{
            const user = await User.findByPk(data.user_id);
        Booking.update(
            {deleted_at:new Date()},
            {returning: true, where: {id: data.id} }
          ).then(count=> {
            const from = '"Boo-kings.id" <foo@example.com>'; // sender address
            const to = user.email; // list of receivers
            const subject = "Checkin Room"; // Subject line
            const text = "Thank you for check in ..."; // plain text body
            const html = "at <b>"+cekin+"</b>";
            send(from,to,subject,text,html)
            
        })
        })
        
    })

}, the_interval);