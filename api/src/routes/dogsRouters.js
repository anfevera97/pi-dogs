const { Router } = require('express');
const dogsRouter = Router();
const {
	getDogHandler,
	createDogHandler,
	getDogByIdHandler,
} = require('../handlers/DogHandlers');

dogsRouter.get('/', getDogHandler); //FUNCIONANDO
dogsRouter.get('/:dogId', getDogByIdHandler); //FUNCIONANDO
dogsRouter.post('/', createDogHandler); //FUNCIONANDO

module.exports = dogsRouter;
