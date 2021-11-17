const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    insert
}

async function get() {
  const allEvents = await db('events as e')
    .join('users as u', 'e.organizer', 'u.user_id')
    .select(
      'e.event_id',
      'u.first_name as organizer',
      'e.event_title',
      'e.event_location',
      'e.event_description'
    )
  const eventArray = allEvents.map((event) => {
    const eventFormat = {
      event_id: event.event_id,
      organizer: event.organizer,
      title: event.event_title,
      location: event.event_location,
      description: event.event_description
    }
    return eventFormat
  })
  return eventArray
}

async function getById(id) {
  const [event] = await db('events as e')
    .join('users as u', 'e.organizer', 'u.user_id')
    .select(
      'e.event_id',
      'u.first_name as organizer',
      'e.event_title',
      'e.event_location',
      'e.event_description'
    )
    .where('event_id', id)
  return event
}

async function insert(newEvent){
  const event = await db('events')
    .returning(['event_id', 'organizer', 'event_title', 'event_location', 'event_description'])
    .insert(newEvent)
  return event
}
