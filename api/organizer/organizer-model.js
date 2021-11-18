const db = require('../data/db-config')

async function getEvents(organizer) {
  const result = await db('events').where('organizer', organizer)
  return result
}

function createEvent() {

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
