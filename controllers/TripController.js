const { Trips, Stations } = require("../models");

// Get ALL Trip
const GetListAllTrip = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const listTrip = await Trips.findAndCountAll({
      offset: (page - 1) * limit || null,
      limit: limit || null,
      include: [
        {
          model: Stations,
          as: "fromStation_Info",
        },
        {
          model: Stations,
          as: "toStation_Info",
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      data: listTrip.rows,
      metadata: {
        count: listTrip.count,
        page: page || 1,
        limit: limit || listTrip.count,
        num_page:
          listTrip.count % limit === 0
            ? Math.floor(listTrip.count / limit)
            : Math.floor(listTrip.count / limit) + 1 || 1,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create Trip
const CreateOrUpdateTrip = async (req, res) => {
  const { fromStation, toStation, startTime, price } = req.body;
  const { id } = req.params;
  try {
    let data;
    if (id) {
      await Trips.update(req.body, { where: { id } });
      data = await Trips.findOne({ where: { id } });
      res.status(200).send({ message: "Updated", data });
    } else {
      data = await Trips.create({
        fromStation,
        toStation,
        startTime,
        price,
      });
      res.status(201).send({ message: "Created", data });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Detail Trip
const GetDetailTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Trips.findOne({ where: { id } });
    res.status(200).send({ message: "Detail Trip", data });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete Trip
const DeleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Trips.findOne({ where: { id } });
    await Trips.destroy({ where: { id } });
    res.status(200).send({ message: "Deleted", data });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  GetListAllTrip,
  CreateOrUpdateTrip,
  GetDetailTrip,
  DeleteTrip,
};
