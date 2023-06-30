const { Router } = require( 'express' );
const { getRecipeById, getRecipeByName } = require( '../controllers/getRecipes' );
const postRecipe = require( '../controllers/postRecipes' );
// const deleteRecipe = require( '../controllers/deleteRecipe.js' );

const router = Router();

router.get( "/:id", getRecipeById );
router.get( "/", getRecipeByName );
router.post( "/", postRecipe );
// router.delete( "/:id", deleteRecipe );

module.exports = router; 