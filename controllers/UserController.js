const { Users } = require("../models");
const { Op } = require("sequelize");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SearchAllAttributes } = require("../components/SearchAllAttributes");

// Create Or Update User
const CreateOrUpdateUser = async (req, res) => {
  const { name, numberPhone, email, password, type = "user" } = req.body;
  const { id } = req.params;
  let data;
  // Mã hóa password thành n ký tự
  const salt = bcrypt.genSaltSync(10);
  const hash = password && bcrypt.hashSync(password, salt);
  try {
    if (id) {
      req.body.password = password ? hash : password;
      await Users.update(req.body, { where: { id } });
      data = await Users.findOne({
        where: { id },
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).send({ status: "Updated", data });
    } else {
      const avatarUrl = gravatar.url(
        email,
        { s: "200", r: "x", d: "retro" },
        true
      );
      data = await Users.create({
        name,
        numberPhone,
        email,
        password: hash,
        type: type || "user",
        avatar: avatarUrl,
      });
      res.status(201).send({ status: "Created", data });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get List All User
const GetListAllUser = async (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const listUser = await Users.findAndCountAll({
      offset: page && limit ? (page - 1) * limit : null,
      limit: limit || null,
      where: search && {
        [Op.or]: SearchAllAttributes(["name", "numberPhone", "email"], search),
      },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).send({
      data: listUser.rows,
      metadata: {
        page: page || 1,
        num_page: limit
          ? listUser.count % limit === 0
            ? Math.floor(listUser.count / limit)
            : Math.floor(listUser.count / limit) + 1
          : 1,
        count: listUser.count,
        limit: limit || listUser.count,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Detail User
const GetDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const data = await Users.findOne({
        where: { id },
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete User
const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Users.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });

    await Users.destroy({ where: { id } });

    res.status(200).send({ status: "Deleted", data });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Login
const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { email },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  let userCustom = { ...user.dataValues };
  delete userCustom.password;

  const isAuth = await bcrypt.compare(password, user.password);
  if (isAuth) {
    let token = jwt.sign(
      {
        data: { name: user.name, type: user.type, email: user.email },
      },
      "khacvu0505",
      { expiresIn: "8h" }
    );
    res
      .status(200)
      .send({ message: "Login Sucess", data: { ...userCustom, token } });
  } else {
    res.status(400).send({
      message: "Login Failed",
      detail: "Email or Password is incorrect",
    });
  }
};

// Upload Avatar
const UploadAvatar = async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  const publicFile = `http://v-bookingtickets.herokuapp.com/${file.path}`;

  try {
    await Users.update(
      { avatar: publicFile },
      {
        where: { id },
      }
    );
    const upload = await Users.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send({ message: "Updated", data: upload });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  CreateOrUpdateUser,
  GetListAllUser,
  GetDetailUser,
  DeleteUser,
  UserLogin,
  UploadAvatar,
};
