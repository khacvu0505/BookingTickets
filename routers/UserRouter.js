const express = require("express");
const UserRouter = express.Router();
const {
  UserRegistration,
  GetListAllUser,
  GetDetailUser,
} = require("../controllers/UserController");

// Add User
UserRouter.post("/", UserRegistration);

// Get List All User
UserRouter.get("/", GetListAllUser);

// Get Detail User
UserRouter.get("/:id", GetDetailUser);

module.exports = UserRouter;
