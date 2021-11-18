exports.seed = async function(knex) {
  await knex('events').insert([
    {
      organizer: 1,
      event_title: 'Friendsgiving',
      event_location: 'Monicas House',
      event_description: 'bring your favorite dish to share with friends',
      event_date: '11/20/2021'
    },
    {
      organizer: 2,
      event_title: 'Thanksgiving',
      event_location: 'Seans House',
      event_description: 'gather with family for thanksgiving',
      event_date: '11/25/2021'
    },
    {
      organizer: 3,
      event_title: 'Birthday Dinner',
      event_location: 'Tinas House',
      event_description: 'celebrate Tinas birthday',
      event_date: '11/30/2021'
    }
  ])
}
