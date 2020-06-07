import {Request, Response} from 'express';
import knex from '../database/connection';


class Recyclable_itemsController{
    async index (request: Request, response: Response) {

        /* return all the 'recyclable_items' on the database.
        The 'await' it's a way to wait to load all the list so the complete list can be shown at one time. */
        const recyclableItems = await knex('recyclable_items').select('*');
    
        /* 'recyclableItems.map()' it's a method that go through all the 'recyclableItems'
        and allow us to modify then as we want.
        It's important to note that the 'map()' method does not modify the original array,
        it returns a new array with the items resulting from the mapping. */
        const serializedItems = recyclableItems.map( item => {
            
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`, // here must be used this grave accent.
            };
        });
    
        return response.json(serializedItems);
    }
}

export default Recyclable_itemsController;