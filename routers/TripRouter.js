const express = require("express");
const TripRouter = express.Router();
const {
  CheckNull,
  ShowError,
  checkDate,
  CheckExit,
} = require("../middlewares/validations/Validations");
const {
  GetListAllTrip,
  CreateOrUpdateTrip,
  GetDetailTrip,
  DeleteTrip,
} = require("../controllers/TripController");
const { Trips } = require("../models");

// Get All Trip
TripRouter.get("/", GetListAllTrip);

// Create Trip
TripRouter.post(
  "/",
  CheckNull(["fromStation", "toStation", "startTime", "price"]),
  checkDate("startTime"),
  ShowError,
  CreateOrUpdateTrip
);

// Get Detail Trip
TripRouter.get("/:id", CheckExit(Trips), GetDetailTrip);

// Update Trip
TripRouter.put("/:id", CheckExit(Trips), CreateOrUpdateTrip);

// Delete Trip
TripRouter.delete("/:id", CheckExit(Trips), DeleteTrip);

module.exports = TripRouter;
