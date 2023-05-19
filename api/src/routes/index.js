const { Router } = require('express');
const dogsRouter = require('./dogsRouters');
const temperamentsRouter = require('./temperamentsRouters');

const router = Router();

router.use('/dog', dogsRouter); //FUNCIONANDO
router.use('/temperaments', temperamentsRouter); // FUNCIONANDO

module.exports = router;

