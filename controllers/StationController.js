const { Stations } = require("../models");
const { Op } = require("sequelize");

// List All Station
const getListStation = async (req, res) => {
  const { name } = req.query;
  let listStation = [];
  try {
    if (name) {
      listStation = await Stations.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } else {
      listStation = await Stations.findAll();
    }
    res.status(200).send(listStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add new Station
const createStation = async (req, res) => {
  const { name, address, province } = req.body;
  try {
    const newStation = await Stations.create({ name, address, province });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getListStation,
  createStation,
};
