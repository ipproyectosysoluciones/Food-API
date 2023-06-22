require( 'dotenv' ).config();
const axios = require( 'axios' );
const { API_KEY } = process.env;
const { Recipe, Diet } = require( '../db.js' );
const { Op } = require( 'sequelize' );

const LIMIT = 100;
// const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${LIMIT}`;
const URL = `http://localhost:8080/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${LIMIT}`;

const reduceObjectsRecipes = ( recipes ) => {
  return {
    id: recipes.id,
    name: recipes.title,
    image: recipes.image,
    summary: recipes.summary,
    healthScore: recipes.healthScore,
    steps: recipes.analyzedInstructions[0] ? recipes.analyzedInstructions[0].steps.reduce( ( obj, steps ) => {
      obj[ steps.number ] = steps.step
      return obj;
    }, {} ) : {},
    diets: recipes.diets,
  }
};

const modifyDietAttributes = ( recipe ) => {
  recipe = recipe.toJson();
  recipe.diets = recipe.diets.map( diet => diet.name );
  return recipe;
};

const getRecipeById = async ( req, res ) => {
  const { id } = req.params;

  try {
    if ( id === undefined ) return res.status( 404 ).send( 'no hay ID' );
    // https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}
    if ( !id.includes( "-" ) ) {
      const recipeApi = await axios.get( `http://localhost:8080/recipes/${id}/information?apiKey=${API_KEY}` )
      .then( resp => resp.data );

      if ( recipeApi.hasOwnProperty( 'id' )) return res.json( reduceObjectsRecipes( recipeApi ));
    } else {
      const recipeDB = await Recipe.findByPk( id, {
        include: {
          model: Diet,
          as: 'diets',
          attributes: [ 'name' ],
          through: { attributes: [], },
        },
      });
      return res.json( modifyDietAttributes( recipeDB ));
    }
    return res.status( 404 ).send( 'No se encontro receta' );
  } catch ( error ) {
    return res.status( 404 ).json( error.message );
  }
};

const getRecipeByName = async ( req, res ) => {
  try {
    const { name } = req.query;

    // Busca 100 recetas en la API 
    const { results } = await axios.get( URL )
    .then( resp => resp.data );

    //Filtra las recetas a solo las que tengan el valor de la query "name" incluida en su titulo 
    let recipesApi = !!name ? results.filter( recipe => recipe.title.toLowerCase().includes( name.toLowerCase()))
    :results;

    //Objeto de cada receta solo con las propiedades necesarias
    recipesApi = recipesApi.map(( recipe ) => reduceObjectsRecipes( recipe ));

    let recipesDB = await Recipe.findAll({
      where: !!name ? {
        name: {
          [ Op.substring ]: name.toLowerCase(),
        },
      }:{},
      include: {
        model: Diet,
        as: 'diets',
        attributes: [ 'name' ],
        through: { attributes: [] },
      },
    });

    recipesDB = recipesDB.map( recipe => modifyDietAttributes( recipe ));

    const recipesAll = recipesApi.concat( recipesDB );

    return ( recipesAll.length ) ? res.json( recipesAll ) : res.json( [] );

  } catch ( error ) {
    return res.status( 404 ).json( error.message );
  }
};

module.exports = { getRecipeById, getRecipeByName };