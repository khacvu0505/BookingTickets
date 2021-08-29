const { validationResult, check } = require("express-validator");

const ShowError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array().map((item) => item.msg) });
    return;
  } else {
    next();
  }
};
const CheckNull = (data) => {
  let arrError = data.map((item) =>
    check(item, `${item} does not Empty`).not().isEmpty()
  );
  return arrError;
};
module.exports = { ShowError, CheckNull };
