exports.seed = async function(knex) {
  await knex('events').insert([
    {
      event_title: 'Friendsgiving',
      event_location: 'Monicas House',
      event_description: 'bring your favorite dish to share with friends',
      organizer: 1
    }
  ])
};
