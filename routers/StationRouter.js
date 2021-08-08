const express = require("express");
const StationRouter = express.Router();
const {
  getListStation,
  createStation,
} = require("../controllers/StationController");

StationRouter.get("/", getListStation);
StationRouter.post("/", createStation);

module.exports = StationRouter;
