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

  // const guests = allEvents.map((events) => {
  //   const eventFormat = {
  //     event_id: events.event_id,
  //     organizer: events.organizer,
  //     event_title: events.event_title,
  //     event_location: events.event_location,
  //     event_description: events.event_description
  //   }
  //   return eventFormat
  // })
  // return guests
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
