const db = require('../data/db-config')

async function get() {
  const allGuests = await db('guests')
    .join('users', 'guests.user_id', 'users.user_id')
    .join('events', 'guests.event_id', 'events.event_id')
    .select('guest_id', 'users.first_name as name', 'events.event_title as title', 'dish')
  const guestArray = allGuests.map((guest) => {
    const guestFormat = {
      guest_id: guest.guest_id,
      name: guest.name,
      event: guest.title,
      dish: guest.dish
    }
    return guestFormat
  })
  return guestArray
}

function getById() {

}

function add() {

}

module.exports = {
  get,
  getById,
  add
}
