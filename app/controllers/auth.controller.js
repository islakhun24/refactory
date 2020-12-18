const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    
        User.create({
            email: req.body.email,
            photo: req.file.originalname,
            password: bcrypt.hashSync(req.body.password, 8)
          })
            .then(user => {
                res.send({ message: "User registered successfully!" });
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
    
  
};

exports.signin = (req, res) => {
    
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};