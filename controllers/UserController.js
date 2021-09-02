const { Users } = require("../models");
const { Op } = require("sequelize");

// Create Or Update User
const UserRegistration = async (req, res) => {
  const { name, numberPhone, email, password, type = "user" } = req.body;
  try {
    const data = await Users.create({
      name,
      numberPhone,
      email,
      password,
      type,
    });
    res.status(201).send({ status: "Created", data });
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

const SearchAllAttributes = (attributes, search) => {
  let arr = attributes.map((ele) => ({
    [ele]: {
      [Op.like]: `%${search}%`,
    },
  }));
  return Object.assign({}, ...arr);
};

// Get Detail User
const GetDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const data = await Users.findOne({ where: { id } });
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { UserRegistration, GetListAllUser, GetDetailUser };
