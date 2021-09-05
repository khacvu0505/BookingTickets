const express = require("express");
const UserRouter = express.Router();
const { Users } = require("../models");
const {
  CreateOrUpdateUser,
  GetListAllUser,
  GetDetailUser,
  DeleteUser,
  UserLogin,
  UploadAvatar,
} = require("../controllers/UserController");
const {
  ShowError,
  CheckNull,
  CheckExit,
  checkEmail,
} = require("../middlewares/validations/Validations");
// *** Upload Images
const { UploadImage } = require("../middlewares/uploads/UploadImage");

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
  checkEmail(),
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
  CheckExit(Users),
  CreateOrUpdateUser
);

// Delete User
UserRouter.delete(
  "/:id",
  Authenticate,
  Authorize(["admin"]),
  CheckTokenExpiration,
  CheckExit(Users),
  DeleteUser
);

//Login
UserRouter.post("/login", UserLogin);

// User Upload Avatar
UserRouter.put(
  "/upload/avatar/:id",
  Authenticate,
  UploadImage("avatar"),
  UploadAvatar
);

module.exports = UserRouter;
