const Authorize = (arrType) => (req, res, next) => {
  const { user } = req;
  try {
    let idx = arrType.findIndex((item) => item === user.data.type);
    if (idx !== -1) {
      req.exp = user.exp;
      next();
    } else {
      res.status(403).send({ messgae: "Permission Deny" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { Authorize };
