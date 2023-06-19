const { index, store, } = require('../handlers/recipe');
const { Router } = require( 'express' );
const router = Router();


//Grupo de rutas
router
  .route( '/' )
  .get( index );
  // .post( store );

router.get( '/:id' );

module.exports = router;