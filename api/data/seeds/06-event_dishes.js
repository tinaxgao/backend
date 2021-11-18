exports.seed = async function(knex) {
  await knex('event_dishes').insert([
    {
      event_id: 1,
      dish_id: 1,
      user_id: 1
    },
    {
      event_id: 2,
      dish_id: 2,
      user_id: 2
    },
    {
      event_id: 3,
      dish_id: 3,
      user_id: 3
    }
  ])
}
