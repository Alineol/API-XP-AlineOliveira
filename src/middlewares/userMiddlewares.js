const joi = require('joi');
const { messages } = require('joi-translation-pt-br');
const jwt = require('../jwt');

const validateLoginBody = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().required().min(3),
    senha: joi.string().required().min(7),
  });
  const { error } = schema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  return next();
};

const validatetoken = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  const validate = await jwt.conferirToken(req.headers.authorization);
  if (!validate) return res.status(401).json({ message: 'Token inválido ou expirado' });
  next();
};

module.exports = {
  validateLoginBody,
  validatetoken,
};
