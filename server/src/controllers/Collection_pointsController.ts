import {Request, Response} from 'express';
import knex from '../database/connection';

class Collection_pointsController{
    async create(request: Request, response: Response){
        /* recurso de desestruturação do javascript. Onde se coloca cada campo em uma variável diferente de uma só vez. */
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            recyclableItems

        } = request.body;

        /* Here, the 'transaction' feature is used because
        the second query depends on the first and,
        if the second receives an error in the insertion,
        it'ss important that the first query stops executing. (http://knexjs.org/#Transactions) */
        //--------------------------------------------------------------------------
        
        const trx = await knex.transaction(); // trx is the default name of the 'transaction' variable, accepted by the community.

        const point = {
            image: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('collection_points').insert(point);

        const point_id = insertedIds[0];

        const pointsItems = recyclableItems.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });

        /*        
        try {
                await trx('points_items')
                .insert(pointsItems)
        
                await trx.commit();
            } catch (error) {
                await trx.rollback();
        
                return response.status(400).json({ message: 'Falha na inserção na tabela points_items, verifique se os items informados são válidos' })
            }
        */        

        await trx('points_items').insert(pointsItems);

        await trx.commit(); //inserts the transaction data into the database.

        //--------------------------------------------------------------------------


        return response.json({
            id: point_id,
            ...point
        });
    }


    async index(request: Request, response: Response){
        const { city, uf, recyclableItems } = request.query;

        /*
            converte a informação retornada por 'recyclableItems' em um array, sem vírgula ('split()') e sem ter problemas com o espaçamento ('trim()'), caso tenha, tanto pela esquerda quanto pela direita. E o 'Number' transforma a variável 'parsedRecyclableItems' em um vetor numérico.
        */
        const parsedRecyclableItems = String(recyclableItems)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('collection_points')
            .join('points_items', 'collection_points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedRecyclableItems) // 'whereIn' seleciona os items em 'points_items.point_id' que correspondem a pelo menos um dos itens presentes em 'parsedRecyclableItems'.
            .where('city', String(city)) // sempre que a gente recebe informação pelo query é bom informar o formato/tipo (String, Number) porque pode vir qualquer coisa
            .where('uf', String(uf))
            .distinct()
            .select('collection_points.*');
        
        return response.json(points);

    }


    async show(request: Request, response: Response){
        const { id } = request.params; // is the same as 'const id = request.params.id;'

        const point = await knex('collection_points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Collection Point not found!' });
        }

        const recyclableItems = await knex('recyclable_items')
            .join('points_items', 'recyclable_items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('recyclable_items.title');

        return response.json({ point, recyclableItems });

    }
}

export default Collection_pointsController;