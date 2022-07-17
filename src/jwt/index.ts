import dotenv from 'dotenv';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

dotenv.config();

const TokenSecret = process.env.JWT_SECRET as string;

const generateToken = (email: string): string => sign({ email }, TokenSecret, {
  expiresIn: '300m', algorithm: 'HS256',
});

const checkToken = async (token: string): Promise<string | JwtPayload | boolean> => {
  try {
    const validate = verify(token, TokenSecret);
    return validate;
  } catch (err) {
    return false;
  }
};

export default { generateToken, checkToken };