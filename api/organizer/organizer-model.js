const db = require('../data/db-config')

async function getEvents(organizer) {
  const result = await db('events').where('organizer', organizer)
  return result
}

async function createEvent(newEvent) {
  const event = await db('events')
    .returning(['event_id', 'organizer', 'event_title', 'event_location', 'event_description', 'event_date'])
    .insert(newEvent);
    return event;
}

async function updateEvent(event_id, changes) {
  const event = await db('events')
    .where('event_id', event_id)
    .update(changes, ['event_id', 'organizer', 'event_title', 'event_location', 'event_description', 'event_date'])
  return event
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent
}
