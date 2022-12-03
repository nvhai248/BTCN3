const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'QLMovies',
    user: 'postgres',
    password: '123456789',
    max: 30
};


// connect to db
const db = pgp(cn);

module.exports = {
    addUser: async u => {
        const rs = await db.one('INSERT INTO public."Account" VALUES ($1, $2) RETURNING *',
            [u.username, u.password]);
        return rs;
    },

    SearchUserByUsername: async username => {
        const rs = await db.one('SELECT * FROM public."Account" WHERE "username" = $1', [username]);
        return rs;
    },
}