const express = require("express");
const rootRouter = express.Router();
// *** Routers
const StationRouter = require("./StationRouter");
const UserRouter = require("./UserRouter");
const TripRouter = require("./TripRouter");

// Use Router
rootRouter.use("/stations", StationRouter);
rootRouter.use("/users", UserRouter);
rootRouter.use("/trips", TripRouter);

module.exports = rootRouter;
