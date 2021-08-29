const express = require("express");

const {
  ShowError,
  CheckNull,
} = require("../middlewares/validations/Validations");
const StationRouter = express.Router();
const {
  getListStation,
  createStation,
} = require("../controllers/StationController");

StationRouter.get("/", getListStation);
StationRouter.post(
  "/",
  CheckNull(["name", "address", "province"]),
  ShowError,
  createStation
);

module.exports = StationRouter;
