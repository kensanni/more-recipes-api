import { signUp, signInUser } from '../controllers/user';
import { validateUserInputRules, validate, validateUserSignIn } from '../utils/validation';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: "Welcome to the world of great recipes"
  }));

  app.post(
    '/api/v1/users/signup',
    validate(validateUserInputRules),
    signUp
  )

  app.post(
    '/api/v1/users/signin',
    validateUserSignIn,
    signInUser
  )
};
