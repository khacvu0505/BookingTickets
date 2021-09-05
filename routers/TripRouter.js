const express = require("express");
const TripRouter = express.Router();
const {
  CheckNull,
  ShowError,
  checkDate,
} = require("../middlewares/validations/Validations");
const { GetListAllTrip, CreateTrip } = require("../controllers/TripController");

// Get All Trip
TripRouter.get("/", GetListAllTrip);

// Create Trip
TripRouter.post(
  "/",
  CheckNull(["fromStation", "toStation", "startTime", "price"]),
  checkDate("startTime"),

  ShowError,
  CreateTrip
);

module.exports = TripRouter;
