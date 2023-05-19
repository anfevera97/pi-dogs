const { Router } = require('express');
const temperamentsRouter = Router();
const temperamentHandler = require('../handlers/Temperaments');

temperamentsRouter.get('/', temperamentHandler); //FUNCIONANDO

module.exports = temperamentsRouter;
