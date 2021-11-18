exports.seed = async function(knex) {
  await knex('guests').insert([
    {
      event_id: 1,
      user_id: 1,
      dish: 'turkey'
    }
  ])
}
