const { Diet } = require(`../db.js`)

module.exports = async  ( req, res ) => {
  try {
    const diets = await Diet.findAll();
    return res.json( diets );
  } 
  catch ( error ) {
    return res.json( error.message );
  }
};