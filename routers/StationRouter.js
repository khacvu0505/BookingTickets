const { Router } = require("express");
const StationRouter = Router();

StationRouter.use("/", () => {
  console.log("hello");
});

module.exports = StationRouter;
