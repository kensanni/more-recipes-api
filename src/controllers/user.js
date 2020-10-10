import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import query from '../db/query';
import config from '../config';

const signUp = async (req, res) => {

  let {
    name, username, email, image
  } = req.body;

  let { password } = req.body;

  password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const createUserQuery = `INSERT INTO
    users(name, username, email, image, password, created_on)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;

  const created_on = moment(new Date())
  
  const values = [
    name,
    username,
    email,
    image,
    password,
    created_on
  ]
  
  try {
    const createUser = await query.sqlQuery(createUserQuery, values);

    if (createUser) { 
      const { id } = createUser.rows[0];
      id, username, email = createUser.rows[0];
      const payload = { id, username, email };
      const token = jwt.sign(payload, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
      });
      
      res.status(201).send({
        message: 'User created',
        token
      });
    };
  } catch (err) {
    if (err.routine === "_bt_check_unique") {
      const msg = err.constraint === 'users_username_key' ? 'User with username already exist' : 'User with email already exist';
      return res.status(409).json({
        message: msg
      });
    }
    return res.status(500).send(err)
  }
}

const signInUser = async (req, res, next) => {
  const { id, username, email, password } =  req.signInQueryResponse 
  
  if (bcrypt.compareSync(req.body.password, password)) {
    const payload = {
      id,
      username,
      email
    };
    const token = jwt.sign(payload, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp
    });

    res.status(200).send({
      message: 'Login successful',
      token,
    });

  } else {
    res.status(403).send({
      errors: [{
        message: 'Incorrect login details'
      }]
    });
  }

}

export {
  signUp,
  signInUser
}