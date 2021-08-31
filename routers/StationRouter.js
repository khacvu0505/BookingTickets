const express = require("express");
const {
  ShowError,
  CheckNull,
  CheckExit,
} = require("../middlewares/validations/Validations");
const StationRouter = express.Router();
const {
  GetListStation,
  CreateOrUpdateStation,
  GetDetailStation,
  DeleteStation,
} = require("../controllers/StationController");
// Model
const { Stations } = require("../models");

// Get All Station
StationRouter.get("/", GetListStation);

// Create Station
StationRouter.post(
  "/",
  CheckNull(["name", "address", "province"]),
  ShowError,
  CreateOrUpdateStation
);

// Get Detail Station
StationRouter.get("/:id", GetDetailStation);

// Update Station
StationRouter.put("/:id", CheckExit(Stations), CreateOrUpdateStation);

// Delete Station
StationRouter.delete("/:id", CheckExit(Stations), DeleteStation);
module.exports = StationRouter;
