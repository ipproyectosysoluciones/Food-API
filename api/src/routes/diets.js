const { Router } = require( 'express' );
const { getDiets } = require( '../handlers/getDietsHandlers' );

const router = Router();

router.get( "/", getDiets );

module.exports = router; 