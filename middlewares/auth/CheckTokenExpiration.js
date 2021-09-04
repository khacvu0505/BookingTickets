const CheckTokenExpiration = (req, res, next) => {
  if (req.exp > new Date().getTime() / 1000) {
    next();
  } else {
    res.status(400).send({ message: "Please login again" });
  }
};
module.exports = { CheckTokenExpiration };
