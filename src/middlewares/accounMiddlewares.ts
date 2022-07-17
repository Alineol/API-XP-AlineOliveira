import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const validateBody = (req: Request, res: Response, next: NextFunction): Response | void => {
  const schema = joi.object({
    codCliente: joi.number().required(),
    valor: joi.number().positive().required(),
  });
  const { error } = schema.validate(req.body, { messages }); 
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  return next();
};

export default {
  validateBody,
};
