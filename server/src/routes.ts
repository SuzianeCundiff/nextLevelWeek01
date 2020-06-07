import express from 'express';

import Collection_pointsController from './controllers/Collection_pointsController';
import Recyclable_itemsController from './controllers/Recyclabe_itemsController';


const routes = express.Router();

const collection_pointsController = new Collection_pointsController();
const recyclable_itemsController = new Recyclable_itemsController();

/*
    Controller's Methods

    index(list), show(show just one element), create, update, delete
*/

routes.get('/recyclable_items', recyclable_itemsController.index);

routes.post('/collection_points', collection_pointsController.create);
routes.get('/collection_points', collection_pointsController.index);
routes.get('/collection_points/:id', collection_pointsController.show);

export default routes;