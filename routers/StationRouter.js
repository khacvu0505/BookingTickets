const express = require("express");
const {
  ShowError,
  CheckNull,
  CheckExit,
} = require("../middlewares/validations/Validations");
const { Authenticate } = require("../middlewares/auth/Authenticate");
const { Authorize } = require("../middlewares/auth/Authorize");
const {
  CheckTokenExpiration,
} = require("../middlewares/auth/CheckTokenExpiration");

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
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  CheckNull(["name", "address", "province"]),
  ShowError,
  CreateOrUpdateStation
);

// Get Detail Station
StationRouter.get("/:id", GetDetailStation);

// Update Station
StationRouter.put(
  "/:id",
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  CheckExit(Stations),
  CreateOrUpdateStation
);

// Delete Station
StationRouter.delete(
  "/:id",
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  CheckExit(Stations),
  DeleteStation
);
module.exports = StationRouter;
