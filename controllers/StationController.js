const { Stations } = require("../models");
const getListStation = async (req, res) => {
  const listStation = await Stations.findAll();
  if (listStation.length > 0) {
    res.status(200).send(listStation);
  } else {
    res.status(200).send("Chưa có bến xe");
  }
};
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
