const { authJwt } = require("../middleware");
const controller = require("../controllers/booking.controller");
module.exports = function(app) {
 app.post(
    "/api/booking",
    [authJwt.verifyToken],
    controller.booking_room
  );

  app.put(
    "/api/booking/:id",
    [authJwt.verifyToken],
    controller.cekin
  );
 }

