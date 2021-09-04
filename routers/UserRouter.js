const express = require("express");
const UserRouter = express.Router();
const { Users } = require("../models");
const {
  CreateOrUpdateUser,
  GetListAllUser,
  GetDetailUser,
  DeleteUser,
  UserLogin,
} = require("../controllers/UserController");
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
// Add User
UserRouter.post(
  "/",
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  CheckNull(["name", "numberPhone", "email", "password"]),
  ShowError,
  CreateOrUpdateUser
);

// Get List All User
UserRouter.get(
  "/",
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  GetListAllUser
);

// Get Detail User
UserRouter.get("/:id", Authenticate, CheckExit(Users), GetDetailUser);

// Update User
UserRouter.put(
  "/:id",
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  CreateOrUpdateUser
);

// Delete User
UserRouter.delete(
  "/:id",
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  DeleteUser
);

//Login
UserRouter.post("/login", UserLogin);

module.exports = UserRouter;
