import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const validateAtivosCorretoraParams = (req: Request, res: Response, next: NextFunction)
: Response | void => {
  const schema = joi.object({
    codAtivo: joi.number(),
  });
  const { error } = schema.validate(req.params, { messages }); 
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  return next();
};

const validateAtivosClienteParams = (req: Request, res: Response, next: NextFunction)
: Response | void => {
  const schema = joi.object({
    codCliente: joi.number(),
  });
  const { error } = schema.validate(req.params, { messages }); 
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  return next();
};

export default {
  validateAtivosCorretoraParams,
  validateAtivosClienteParams,
};
