const dotenv = require('dotenv');
const { sign, verify } = require('jsonwebtoken');

dotenv.config();

const TokenSecret = process.env.JWT_SECRET;

const gerarToken = (email) => sign({ email }, TokenSecret, {
  expiresIn: '300m', algorithm: 'HS256',
});

const conferirToken = async (token) => {
  try {
    const validate = verify(token, TokenSecret);
    return validate;
  } catch (err) {
    return false;
  }
};
module.exports = { gerarToken, conferirToken };
