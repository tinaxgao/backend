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

function createGuest() {

}

function updateEvent() {

}

module.exports = {
  getEvents,
  createEvent,
  createGuest,
  updateEvent
}
