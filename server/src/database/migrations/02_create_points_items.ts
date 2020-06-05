import Knex from 'knex';

//CRIAR A TABELA
export async function up(knex: Knex) {
    return knex.schema.createTable('points_items', table => {
        table.increments('id').primary();

        table.integer('point_id').notNullable()
        .references('id')
        .inTable('collection_points');
        
        table.integer('item_id').notNullable()
        .references('id')
        .inTable('recyclable_items');       
    });
}

//VOLTAR ATRÁS (DELETAR A TABELA)
export async function down(knex: Knex) {
    return knex.schema.dropSchema('points_items');

}