const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    insert
}

function get() {
    return db('events');
}

function getById(id) {
    return db('events')
        .where({ id })
        .first();
}
//Still need to test 'insert'
function insert(event){
    return db('events')
        .insert(event)
        .then(id => {
            return getById(id[0]);
        })
}
