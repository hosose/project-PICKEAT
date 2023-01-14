const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { email, password, name, phonenumber } = req.body;

  if (!email || !password || !name || !phonenumber) {
    return res.status(401).json({ message: 'KEY_ERROR' });
  }

  await userService.signUp(email, password, name, phonenumber);
  return res.status(201).json({
    message: 'SIGNUP_SUCCESS',
  });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const accessToken = await userService.signIn(email, password);
  res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  signIn,
  signUp,
};
