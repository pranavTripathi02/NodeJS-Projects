const { StatusCodes } = require('http-status-codes');

const NotFoundMiddleware = (req, res, next) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: "Couldn't find what you're looking for" });
  next();
};

module.exports = NotFoundMiddleware;
