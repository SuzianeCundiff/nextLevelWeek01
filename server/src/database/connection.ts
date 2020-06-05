import knex from 'knex';
import path from 'path';

const connection = knex ({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'), // solves the problem of accessing directories on different Operating Systems.
    },
    useNullAsDefault: true, // this line solve the problem 'sqlite does not support inserting default values.'
});

export default connection;