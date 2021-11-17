const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    insert
}

async function get() {
  const allEvents = await db('events as e')
    .join('users as u', 'e.event_id', 'u.user_id')
    .select(
      'e.event_id',
      'u.first_name as organizer',
      'e.event_location',
      'e.event_description'
    )
    return allEvents
}

async function getById(id) {
  const [event] = await db('events as e')
    .join('users as u', 'e.event_id', 'u.user_id')
    .select(
      'e.event_id',
      'u.first_name as organizer',
      'e.event_location',
      'e.event_description'
    )
    .where('event_id', id)
  return event
}

//Still need to test 'insert'
function insert(event){
  return db('events')
      .insert(event)
      .then(id => {
          return getById(id[0]);
      })
}
