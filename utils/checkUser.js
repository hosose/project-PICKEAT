const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { getUserById } = require('../services/userService');
const { catchAsync } = require('./error');
const loginRequired = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error('NEED_ACCESS_TOKEN');
    error.statusCode = 401;
    return res.status(error.statusCode).json({ message: error.message });
  }

  const decoded = await promisify(jwt.verify)(
    accessToken,
    process.env.secretKey
  );

  const user = await getUserById(decoded.id);

  if (!user) {
    const error = new Error('USER_DOES_NOT_EXIST');
    error.statusCode = 404;

    return res.status(error.statusCode).json({ message: error.message });
  }

  req.user = user;
  next();
});

module.exports = { loginRequired };
