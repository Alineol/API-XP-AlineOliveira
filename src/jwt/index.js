const dotenv = require('dotenv');
const { sign, verify } = require('jsonwebtoken');

dotenv.config();

const TokenSecret = process.env.JWT_SECRET;

const generateToken = (email) => sign({ email }, TokenSecret, {
  expiresIn: '300m', algorithm: 'HS256',
});

const checkToken = async (token) => {
  try {
    const validate = verify(token, TokenSecret);
    return validate;
  } catch (err) {
    return false;
  }
};
module.exports = { generateToken, checkToken };
