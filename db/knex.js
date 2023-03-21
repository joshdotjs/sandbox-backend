const knex = require('knex');

const connect = knex({
    client: 'sqlite3',
    connection: {
        filename: 'cars.db',
    },
});

module.exports = connect;