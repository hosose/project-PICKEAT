const { raiseCustomError } = require('./error');
const validateEmail = (email) => {
  const emailValidation = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  if (!emailValidation.test(email)) {
    raiseCustomError('invalid email', 400);
  }
};

const validatePw = (password) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  if (!pwValidation.test(password)) {
    raiseCustomError('invalid password', 400);
  }
};

module.exports = { validateEmail, validatePw };
