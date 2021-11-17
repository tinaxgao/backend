const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}

async function get() {
  const allEvents = await db('events as e')
    .join('users as u', 'e.organizer', 'u.user_id')
    .select(
      'e.event_id',
      'u.first_name as organizer',
      'e.event_title',
      'e.event_location',
      'e.event_description',
      'e.event_date'
    )
  const eventArray = allEvents.map((event) => {
    const eventFormat = {
      event_id: event.event_id,
      organizer: event.organizer,
      title: event.event_title,
      location: event.event_location,
      description: event.event_description,
      date: event.event_date
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
      'e.event_description',
      'e.event_date'
    )
    .where('event_id', id)
  return event
}

async function insert(newEvent){
  const event = await db('events')
    .returning(['event_id', 'organizer', 'event_title', 'event_location', 'event_description', 'event_date'])
    .insert(newEvent)
  return event
}

async function update(id, event){
  const [updatedEvent] = await db('events')
  .where({ id })
  .update(event, [
    'event_id', 
    'organizer', 
    'event_title', 
    'event_location', 
    'event_description', 
    'event_date'
  ])
  return getById(updatedClass.event_id)
}

async function remove(id){
  return db('events').del().where(id)
}