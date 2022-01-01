const db = require("../data/db-config");

async function getEvents(organizer) {
  const result = await db("events")
    .where("organizer", organizer)
    .join("users", "users.user_id", "events.organizer")
    .select(
      "users.first_name",
      "users.last_name",
      "events.event_id",
      "events.event_title",
      "events.event_location",
      "events.event_date",
      "events.event_description"
    );
  return result;
}

/* select CONCAT(users.First_name , ' ' , users.Last_name) as organizer_name ,events.event_id, events.event_title, events.event_location, events.event_date, events.event_description from events
JOIN users ON users.user_id = events.organizer */

async function createEvent(newEvent) {
  const event = await db("events")
    .returning([
      "event_id",
      "organizer",
      "event_title",
      "event_location",
      "event_description",
      "event_date",
    ])
    .insert(newEvent);
  return event;
}

async function updateEvent(event_id, changes) {
  const event = await db("events")
    .where("event_id", event_id)
    .update(changes, [
      "event_id",
      "organizer",
      "event_title",
      "event_location",
      "event_description",
      "event_date",
    ]);
  return event;
}

async function getEventGuests(event_id) {
  let event = await db("events as e")
    .leftJoin("guests as g", "e.event_id", "g.event_id")
    .join("users as u", "e.organizer", "u.user_id")
    .where("e.event_id", event_id);

  return {
    event_id: event[0].event_id,
    title: event[0].event_title,
    details: {
      organizer: event[0].first_name,
      location: event[0].event_location,
      description: event[0].event_description,
      date: event[0].event_date,
    },
    guests: event.map((guest) => {
      return {
        user_id: guest.user_id,
        guest: guest.first_name,
      };
    }),
  };
}

// async function addGuestToEvent(event_id, data) {
//   const guest = await db('guests')
//     .returning(['guest_id', 'user_id', 'event_id'])
//     .insert({'guest_id', 'user_id', 'event_id'})
//   return getEventGuests(event_id)
// }

// async function addGuestToEvent(newGuest) {
//     const guest = await db('guests')
//       .returning(['guest_id', 'user_id', 'event_id'])
//       .insert(newGuest)
//     return guest
// }

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  getEventGuests,
};
