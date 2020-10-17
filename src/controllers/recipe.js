import moment from 'moment';
import query from '../db/query';
import { createRecipesQuery } from '../db/queries';


const addRecipes = async (req, res) => {
  const { name, description, image } = req.body;
  let{ ingredient } = req.body

  const created_on = moment(new Date());
  ingredient = ingredient.split(', ');

  const user_id = req.decoded.id
  const values = [
    user_id,
    name,
    description,
    ingredient,
    image,
    created_on
  ];

  try {
    const createRecipe = await query.sqlQuery(createRecipesQuery, values)

    if (createRecipe) {
      const data = createRecipe.rows[0];
      
      res.status(201).send({
        message: "Recipes successfully created",
        data
      })
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

export {
  addRecipes
}

