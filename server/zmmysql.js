module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        database: 'tianzi',
        password: 'zywang0209',    // 'wx1c034e9511c8f70b',//
        char: 'utf8mb4'
    }
})

