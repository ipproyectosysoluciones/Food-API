const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipeRoute = require( './recipes' );
const dishTypeRoute = require( './dishTypes' );
const dietRoute = require( './diets' );

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use( '/recipes', recipeRoute );
router.use( '/dishTypes', dishTypeRoute );
router.use( '/diets', dietRoute );

module.exports = router;
