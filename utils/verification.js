const emailVerification = (email) => {
  if (
    !/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/.test(
      email
    )
  )
    return false;
  return true;
};

const passwordVerification = (password) => {
  if (password.length < 6) return false;
  return true;
};

const phoneNumberVerification = (phoneNumber) => {
  if (phoneNumber.length != 10) return false;
  return true;
};

module.exports = {
  emailVerification,
  passwordVerification,
  phoneNumberVerification,
};
