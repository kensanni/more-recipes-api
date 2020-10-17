import { signUp, signInUser } from '../controllers/user';
import { addRecipes } from '../controllers/recipe';
import { validateUserInputRules, validateRecipesInputRules, validate, validateUserSignIn } from '../utils/validation';
import { verifyUser } from '../utils/auth';

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

  app.post(
    '/api/v1/recipes',
    verifyUser,
    validate(validateRecipesInputRules),
    addRecipes
  )
};
