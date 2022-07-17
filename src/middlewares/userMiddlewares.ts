import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';
import jwt from '../jwt';

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

const validatetoken = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void > => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token not found' });
  const validate = await jwt.checkToken(req.headers.authorization);
  if (!validate) return res.status(401).json({ message: 'Invalid token' });
  next();
};

export default {
  validateLoginBody,
  validatetoken,
};