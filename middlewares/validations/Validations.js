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
const CheckNull = (data) =>
  data.map((item) => check(item, `${item} does not Empty`).not().isEmpty());
const CheckExit = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const check = await Model.findOne({
    where: {
      id,
    },
  });
  if (check) {
    next();
  } else {
    return res.status(404).send(`Not Found ID:  ${id}`);
  }
};
module.exports = { ShowError, CheckNull, CheckExit };
