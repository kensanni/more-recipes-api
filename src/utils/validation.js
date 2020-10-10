import { body, check, validationResult } from 'express-validator';
import { signInUser } from '../controllers/user';
import query from '../db/query';


const validateUserInputRules = [
  body("name")
    .isLength({ min: 1 })
    .withMessage("Name should contain atleast 1 character")
    .trim(),
  body("username")
    .isLength({ min: 2 })
    .withMessage("Username should contain atleast 2 character")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .trim(),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage("Please enter a password at least 8 character long and contains one uppercase, one lower case and a special character")
    .trim(),
  body("image")
    .notEmpty()
    .withMessage("Image field is required")
    .trim()
]

const validate = (schemas) => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    };

    const extractedErrors = []

    result.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({
      errors: extractedErrors
    });
  };
}

const validateUserSignIn = async (req, res, next) => {
  const { email, username, password } = req.body

  if (!username && !email) {
    return res.status(400).send({
      message: "Username or Email is required for sign in"
    })
  }

  if (!password) {
    return res.status(400).send({
      message: "Password field is required for sign in"
    })
  }

  const user = username ? username : email
  const signInUserQuery = 'SELECT * FROM users where ((email = $1) OR (username = $1))';

  try {
    const signIn = await query.sqlQuery(signInUserQuery, [user])
    req.signInQueryResponse = signIn.rows[0]

    if (!req.signInQueryResponse) {
      return res.status(400).send({
        message: "User with this email/username  does not exist"
      })
    }
    next()

  } catch (error) {
    res.status(500).send({
      errors: [{
        message: error
      }]
    });
  }
}


export {
  validateUserInputRules,
  validateUserSignIn,
  validate,
}