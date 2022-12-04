const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = require('./connectStr');


// connect to db
const db = pgp(cn);

module.exports = {
    getNumberOfUsers: async () => {
        const count = await db.one('SELECT count(*) FROM public."Account"');
        return count;
    },

    addUser: async u => {
        const rs = await db.one('INSERT INTO public."Account" VALUES ($1, $2, $3) RETURNING *',
            [u.id, u.username, u.password]);
        return rs;
    },

    SearchUserByUsername: async username => {
        const rs = await db.one('SELECT * FROM public."Account" WHERE "username" = $1', [username]);
        return rs;
    },
}