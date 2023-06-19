const controller = require( '../controllers/recipe' );

//Trae todas las recetas
const index = async ( req, res ) =>{
  const { name } = req.query;
  try {
    name === undefined
      ? res.json( await controller.getAll()) //Trae todas las recetas
      : res.json( await controller.searchRecipeByTitle( name )) //Trae solo las recetas que coincidan con la query name
  } catch ( error ) {
    res.status( 400 ).json({ error: error.message });
  }
}

module.exports = {
  index,
}