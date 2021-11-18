const db = require('../data/db-config')

async function get() {
  const allGuests = await db('guests as g')
    .join('users as u', 'g.user_id', 'u.user_id')
    .join('events as e', 'g.event_id', 'e.event_id')
    .select(
      'guest_id',
      'u.first_name as name',
      'e.event_title as title'
      )
  const guestArray = allGuests.map((guest) => {
    const guestFormat = {
      guest_id: guest.guest_id,
      name: guest.name,
      event: guest.title
    }
    return guestFormat
  })
  return guestArray
}

async function getById(id) {
  const [guest] = await db('guests as g')
    .join('users as u', 'g.user_id', 'u.user_id')
    .join('events as e', 'g.event_id', 'e.event_id')
    .select(
      'guest_id',
      'u.first_name as name',
      'e.event_title as title',
      'dish'
      )
    .where('g.guest_id', id)
  return guest
}

async function add(newGuest) {
  const guest = await db('guests')
    .returning(['guest_id', 'user_id', 'event_id', 'dish'])
    .insert(newGuest)
  return guest
}

module.exports = {
  get,
  getById,
  add
}
