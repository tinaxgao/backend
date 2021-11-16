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
      .select('event_id', 'organizer', 'event title', 'event_location', 'event_description')
      .where('event_id', id)
      .first()
}
//Still need to test 'insert'
function insert(event){
    return db('events')
        .insert(event)
        .then(id => {
            return getById(id[0]);
        })
}
