import Knex from 'knex';

//CRIAR A TABELA
export async function up(knex: Knex) {
    return knex.schema.createTable('recyclable_items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();       
    });
}

//VOLTAR ATRÁS (DELETAR A TABELA)
export async function down(knex: Knex) {
    return knex.schema.dropSchema('recyclable_items');

}