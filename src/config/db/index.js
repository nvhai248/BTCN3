const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'QLBH',
    user: 'postgres',
    password: '123456789',
    max: 30
};


// connect to db
const db = pgp(cn);

module.exports = {
    all: async () => {
        const rs = await db.any('SELECT * FROM account');
        return rs;
    },

    add: async u => {
        const rs = await db.one('INSERT INTO account(username, password) VALUES ($1, $2) RETURNING *', [u.username, u.password]);
        return rs;
    },

    byName: async username => {
        const rs = await db.one('SELECT * FROM account WHERE username = $1', [username]);
        return rs;
    }
}