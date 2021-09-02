const express = require("express");
const rootRouter = express.Router();
// *** Routers
const StationRouter = require("./StationRouter");
const UserRouter = require("./UserRouter");

// Use Router
rootRouter.use("/stations", StationRouter);
rootRouter.use("/users", UserRouter);

module.exports = rootRouter;
