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
      )
    .where('g.guest_id', id)
  return guest
}
// OLD ADD GUEST FUNCTION
// async function add(newGuest) {
//   const guest = await db('guests')
//     .returning(['guest_id', 'user_id', 'event_id'])
//     .insert(newGuest)
//   return guest
// }

// async function getEventGuests(event_id) {
//   let event = await db('events as e')
//     .join(
//       'guests as g',
//       'e.event_id',
//       'g.event_id'
//     )
//     .join(
//       'users as u',
//       'e.organizer',
//       'u.user_id'
//     )
//     .where('e.event_id', event_id)

//     return {
//       event_id: event[0].event_id,
//       title: event[0].event_title,
//       details: {
//         organizer: event[0].first_name,
//         location: event[0].event_location,
//         description: event[0].event_description,
//         date: event[0].event_date
//       },
//       guests: event.map(guest => {
//         return ({
//           user_id: guest.user_id,
//           guest: guest.first_name
//         })
//       })
//     }
// }



module.exports = {
  get,
  getById,
}
