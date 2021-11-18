const db = require('../data/db-config');

async function get() {
  const rows = await db('events as e')
    .join('users as u', 'e.organizer', 'u.user_id')
    .join('guests as g', 'e.event_id', 'g.event_id')
    .join('users as us', 'g.user_id', 'us.user_id')
    .select(
      'e.event_id',
      'u.first_name as organizer',
      'e.event_title',
      'e.event_location',
      'e.event_description',
      'e.event_date',
      'g.event_id as event',
      'us.first_name as guest'
    )
    
    // const result = {
    //   event_id: Number.event_id,
    //   organizer: rows[0].organizer,
    //   title: rows[0].event_title,
    //   location: rows[0].event_location,
    //   description: rows[0].event_description,
    //   date: rows[0].event_date,
    //   guests: rows
    //     .map((guest) => {
    //       if(
    //         guest.event !== guest.event_id
    //       ) {
    //         return []
    //       } else {
    //         return {
    //           event: guest.event,
    //           guest: guest.guest
    //         }
    //       }
    //     })
    //     .flat()
    // }
    // return result

  const eventArray = rows.map((event) => {
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

// moving content below to a different page where only an organizer has access to create/update/delete an event
// will keep text here just incase for now

// async function insert(newEvent){
//   const event = await db('events')
//     .returning(['event_id', 'organizer', 'event_title', 'event_location', 'event_description', 'event_date'])
//     .insert(newEvent)
//   return event
// }

// async function update(id, event){
//   const [updatedEvent] = await db('events')
//   .where({ id })
//   .update(event, [
//     'event_id', 
//     'organizer', 
//     'event_title', 
//     'event_location', 
//     'event_description', 
//     'event_date'
//   ])
//   return getById(updatedEvent.event_id)
// }

// async function remove(id){
//   return db('events').del().where(id)
// }

module.exports = {
  get,
  getById,
  // insert,
  // update,
  // remove
}
