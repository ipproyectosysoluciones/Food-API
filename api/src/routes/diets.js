const { Router } = require( 'express' );
const { getDiets } = require( '../handlers/getDiets' );

const router = Router();

router.get( "/", getDiets );

module.exports = router; 