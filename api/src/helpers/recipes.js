
const reduceObjectsRecipes = ( recipes ) => {
  return {
    id: recipes.id,
    name: recipes.title,
    image: recipes.image,
    summary: recipes.summary,
    healthScore: recipes.healthScore,
    steps: recipes.analyzedInstructions[ 0 ] ? recipes.analyzedInstructions[ 0 ].steps.reduce( ( obj, steps ) => {
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

module.exports = { reduceObjectsRecipes, modifyDietAttributes };