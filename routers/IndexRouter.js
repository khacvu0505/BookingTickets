const express = require("express");
const rootRouter = express.Router();
const StationRouter = require("./StationRouter");
// Station Router
rootRouter.use("/stations", StationRouter);
module.exports = rootRouter;
