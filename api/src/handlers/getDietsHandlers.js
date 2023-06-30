const controller = require( '../controllers/getDiets' );

const getDiets = async( req, res ) =>{
  try {
    res.json( await controller.getAll() )
  } catch ( error ) {
    res.status( 400 ).json({ error: error.message });
  }
}

module.exports = { getDiets };