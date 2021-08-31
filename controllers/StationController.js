const { Stations } = require("../models");
const { Op } = require("sequelize");

// List All Station
const GetListStation = async (req, res) => {
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

// Create or Update Station
const CreateOrUpdateStation = async (req, res) => {
  const { name, address, province } = req.body;
  const { id } = req.params;
  try {
    if (id) {
      await Stations.update(req.body, { where: { id } });
      const newValueUpdate = await Stations.findOne({ where: { id } });
      res.status(200).send({ status: "Updated", data: newValueUpdate });
    } else {
      const newStation = await Stations.create({ name, address, province });
      res.status(201).send(newStation);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Detail Stations
const GetDetailStation = async (req, res) => {
  const { id } = req.params;
  try {
    const detailStation = await Stations.findOne({
      where: {
        id,
      },
    });
    if (detailStation) {
      res.status(200).send(detailStation);
      return detailStation;
    } else {
      res.status(200).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete Station
const DeleteStation = async (req, res) => {
  const { id } = req.params;
  const data = await Stations.findOne({ where: { id } });
  console.log(data);
  await Stations.destroy({ where: { id } });
};

module.exports = {
  GetListStation,
  CreateOrUpdateStation,
  GetDetailStation,
  DeleteStation,
};
