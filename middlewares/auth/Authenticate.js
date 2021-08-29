var jwt = require("jsonwebtoken");
const Authenticate = (req, res, next) => {
  // const token = jwt.sign({ foo: "bar" }, "khacvu0505");
  // jwt.sign(
  //   {
  //     data: "foobar",
  //   },
  //   "khacvu0505",
  //   { expiresIn: "1h" }
  // );

  try {
    const token = jwt.sign(
      { foo: "bar" },
      "khacvu0505",
      { algorithm: "RS256" },
      { expiresIn: "1h" }
    );
    const decoded = jwt.verify(token, "khacvu0505");
    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(403).send("Permission Deny");
  }
};
module.exports = Authenticate;
