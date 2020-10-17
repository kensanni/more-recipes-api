import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();

const secret = config.secrets.jwt

const verifyUser = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token;
  if(!token) {
    return res.status(403).send({
      success: false,
      message: 'Not Authorized'
    });
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        success: false,
        message: "Invalid token"
      });
    }
    req.decoded = decoded;
    next();
  })
}

export {
  verifyUser
}