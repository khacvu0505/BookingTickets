const jwt = require("jsonwebtoken");
const Authenticate = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, "khacvu0505");
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({ message: "You aren't login " });
    }
  } catch (error) {
    res.status(error).send({ message: "You aren't login " });
  }
};
module.exports = { Authenticate };
