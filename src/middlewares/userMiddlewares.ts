import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const validateLoginBody = (req: Request, res: Response, next: NextFunction): Response | void => {
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

export default {
  validateLoginBody,
};