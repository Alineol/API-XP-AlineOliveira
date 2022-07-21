import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const validateBodyInvestimentos = (req, res, next)  => {
  const schema = joi.object({
    codCliente: joi.number().required(),
    qtdeAtivo: joi.number().min(1).required(),
    codAtivo: joi.number().required(),
  });
  const { error } = schema.validate(req.body, { messages }); 
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  return next();
};

module.exports = {
  validateBodyInvestimentos,
};
