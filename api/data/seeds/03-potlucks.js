exports.seed = async function(knex) {
  await knex('potlucks').insert([
    {
      potluck_title: 'Friendsgiving',
      potluck_location: 'Monicas House',
      potluck_description: 'bring your favorite dish to share with friends',
      organizer: 1
    }
  ])
};
