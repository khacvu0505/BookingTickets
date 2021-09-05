const { validationResult, check } = require("express-validator");

//*** Show Error
const ShowError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array().map((item) => item.msg) });
    return;
  } else {
    next();
  }
};

//***  Check not Empty
const CheckNull = (data) =>
  data.map((item) => check(item, `${item} does not Empty`).not().isEmpty());

//***  Check Exit
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
    return res.status(404).send({ message: `Not Found ID: ${id}` });
  }
};

// *** Check Format Date
const checkDate = (item) =>
  check(item, `${item} is Date format 'YYYY-MM-DD hh:mm:ss'`).isISO8601();

// *** Check email
const checkEmail = () => check("email", "Email address is not valid").isEmail();

module.exports = { ShowError, CheckNull, CheckExit, checkDate, checkEmail };
