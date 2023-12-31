const { Recipe, Diet } = require( '../db.js' );
const { Op } = require( 'sequelize' );

module.exports = async ( req, res ) => {
  try {
    const { name, image, summary, healthScore, steps, diets } = req.body;

    if ( !name || !summary ) return res.status( 404 ).send( "Creacion Cancelada. Falto Informacion" ); 

    const newRecipe = await Recipe.create({
      name: name.toLowerCase(), [ (/^.+.*\.(jpg|JPG|bmp|BMP|gif|GIF|tif|TIF|png|PNG)$/.test( image )) ? "image" : null ] : image,
      summary,
      healthScore,
      steps,
    });

    const dietsToAdd = await Diet.findAll({ 
      where:{
        name:{
          [ Op.in ]: diets ? diets : []
        },
      },
    });

    await newRecipe.addDiets( dietsToAdd ); 
      return res.json( newRecipe );
  } catch ( error ) {
    return res.status( 404 ).json( error.message );
  }
};