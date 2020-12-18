const { authJwt } = require("../middleware");
const controller = require("../controllers/room.controller");
module.exports = function(app) {
 app.post(
    "/api/room",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addRoom
  );
  app.get(
    "/api/room",
    controller.roomAvailable
  );
 }