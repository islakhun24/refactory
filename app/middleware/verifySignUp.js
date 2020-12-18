const db = require("../models");
const User = db.user;

const uploadFile = require("../middleware/photoUser");
checkDuplicateEmail = async (req, res, next) => {
  try {
    await uploadFile(req,res)
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
    
          if (user) {
              res.status(400).send({
                message: "Failed! Email is already in use!"
              });
              return;
            }
      
            next();
       
  
      
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
};



const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;